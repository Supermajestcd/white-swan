import { Layout } from '../components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin, ModalProvider } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { useRouter } from 'next/router'
import { fileToUrl } from '../utils/fileToUrl'
import { getLocalFiles } from '../utils/getLocalFiles'
import { useCreatePage } from '../utils/useCreatePage'
import { useCreateBlogPage } from '../utils/useCreateBlogPage'
import { ButtonComponent, ButtonComponentTemplate } from '../components/ButtonComponent'
import { TextContent, TextContentTemplate } from '../components/TextContent'
import { Video, VideoTemplate } from '../components/Video'
import { GridContainer } from '.'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { getGlobalStaticProps } from '../utils/getGlobalStaticProps'
import { Form, FormTemplate } from '../components/ContactForm'
import { generateForm } from '../utils/useHubspotFormDefs'
import { useEffect } from 'react'
import * as ga from '../utils/ga'

const formOptions = {
  label: 'Page',
  fields: [
    { name: 'title', component: 'text' }
  ]
}

interface Props {file: GitFile, allPages: string[], allBlogs: string[], global: any}

export default function Page ({ file, allPages, allBlogs, global }: Props) {
  const filename = file?.fileRelativePath.split('/').pop()

  generateForm(filename)
  useCreatePage(allPages)
  useCreateBlogPage(allBlogs)
  const router = useRouter()

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

  if (!file) {
    return (
      <Layout global={global}>
        <Box maxW='xl' justifyContent='center' m='auto' p='3'>
          <Text>No file was found, please check if the build has completed</Text>
        </Box>
      </Layout>
    )
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const [, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  return (
    <Layout global={global}>
      <ModalProvider>
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS as any} components={{
            Container: GridContainer
          }} />
        </InlineForm>
      </ModalProvider>
    </Layout>
  )
}

const PAGE_BLOCKS = {
  textContent: {
    Component: TextContent,
    template: TextContentTemplate
  },
  button: {
    Component: ButtonComponent,
    template: ButtonComponentTemplate
  },
  video: {
    Component: Video,
    template: VideoTemplate
  },
  form: {
    Component: Form,
    template: FormTemplate
  }
}

// /**
//  * Fetch data with getStaticProps based on 'preview' mode
//  */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const allPages = (await getLocalFiles('content') || []).map((fileName) => fileName.replace('content/', '').replace('.json', ''))
  const allBlogs = (await getLocalFiles('content/blog') || []).map((fileName) => fileName.replace('content/blog/', '').replace('.json', ''))
  const global = await getGlobalStaticProps(preview, previewData)

  const { pageName } = params
  const fileRelativePath = `content/${pageName}.json`
  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          global,
          allPages,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          ...previewProps.props
        }
      }
    } catch (e) {
      return {
        props: {
          global,
          allPages,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          file: {
            fileRelativePath,
            data: null
          }
        }
      }
    }
  }

  const content = (await import(`../content/${pageName}.json`)).default

  return {
    props: {
      global,
      allPages,
      allBlogs,
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath,
        data: content
      }
    }
  }
}

export const getStaticPaths = async function () {
  const fg = require('fast-glob')
  const contentDir = 'content'
  const files = await fg(`${contentDir}**/*.json`)
  const paths = files
    .filter((file) => !file.endsWith('index.json'))
    .map((file) => {
      const slug = fileToUrl(file, contentDir)
      return { params: { pageName: slug } }
    })
  return {
    fallback: true,
    paths
  }
}
