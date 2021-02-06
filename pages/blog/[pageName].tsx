import { Layout } from '../../components/Layout'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { Box, Text, Heading } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin, ModalProvider } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { useRouter } from 'next/router'
import { fileToUrl } from '../../utils/fileToUrl'
import { getLocalFiles } from '../../utils/getLocalFiles'
import { useCreatePage } from '../../utils/useCreatePage'
import { useCreateBlogPage } from '../../utils/useCreateBlogPage'
import { ButtonComponent, ButtonComponentTemplate } from '../../components/ButtonComponent'
import { TextContent, TextContentTemplate } from '../../components/TextContent'
import { GridContainer } from '../'
import { getGlobalStaticProps } from '../../utils/getGlobalStaticProps'

const formOptions = {
  label: 'Page',
  fields: [
    { name: 'title', component: 'text' },
    {
      name: 'publish',
      label: 'Publish the blog to go live?',
      component: 'toggle',
      default: false
    }
  ]
}

interface Props {file: GitFile, allPages: string[], allBlogs: string[], global: any}

export default function Page ({ file, allPages, allBlogs, global }: Props) {
  useCreatePage(allPages)
  useCreateBlogPage(allBlogs)
  const router = useRouter()
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

  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)
  return (
    <Layout global={global}>
      <ModalProvider>
        <InlineForm form={form}>
        <Box maxW='xl' justifyContent='center' m='auto' p='10'>
          <Heading textAlign='center'>{data.title}</Heading>
          {data.date && <Text textAlign='center' fontSize="xs" color='#ccc' pb='10'>{new Date(data.date).toDateString()}</Text>}
        </Box>
          {data.featureImg && <Image src={data.featureImg}/>}
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
  const fileRelativePath = `content/blog/${pageName}.json`
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

  const content = (await import(`../../content/blog/${pageName}.json`)).default

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
  const contentDir = 'content/blog'
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
