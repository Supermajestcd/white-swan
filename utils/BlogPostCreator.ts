
import { useCMS, usePlugins } from 'tinacms'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { FORM_ERROR } from 'final-form'
import { removeInvalidChars } from './removeInvalidChars'
import { setCachedFormData, getCachedFormData } from './formCache'
import { useEffect } from 'react'
import * as ga from './ga'

export const useCreatePage = (allPages = []) => {
  // Todo get the all pages
  const router = useRouter()
  const cms = useCMS()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  usePlugins([
    {
      __type: 'content-creator',
      name: 'Make a new page',
      // @ts-ignore
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
          required: true,
          validate (value) {
            if (!value) {
              return 'A title is required'
            }
            if (allPages.some((post) => post.fileName === slugify(value, { lower: true }))) {
              return 'Sorry the page title must be unique'
            }
          }
        },
        {
          name: 'publish',
          label: 'Publish the blog to go live?',
          component: 'toggle',
          default: false
        }
      ],
      onSubmit: async (frontMatter) => {
        const github = cms.api.github
        const fileName = removeInvalidChars(slugify(frontMatter.title, { lower: true }))
        const fileRelativePath = `content/${fileName}.json`
        return await github
          .commit(
            fileRelativePath,
            getCachedFormData(fileRelativePath).sha,
            JSON.stringify({
              ...frontMatter,
              publish: false
            }),
            'Add new page'
          )
          .then((response) => {
            setCachedFormData(fileRelativePath, {
              sha: response.content.sha
            })
            setTimeout(() => router.push(`/${fileName}`), 1500)
          })
          .catch((e) => {
            return { [FORM_ERROR]: e }
          })
      }
    }
  ])
}
