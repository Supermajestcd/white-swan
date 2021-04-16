import { Layout } from '../components/Layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin, ModalProvider } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { Box, Flex, Grid, Heading } from '@chakra-ui/layout'
import { getLocalFiles } from '../utils/getLocalFiles'
import { useCreatePage } from '../utils/useCreatePage'
import { getGlobalStaticProps } from '../utils/getGlobalStaticProps'
import { useCreateBlogPage } from '../utils/useCreateBlogPage'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { TextContent, TextContentTemplate } from '../components/TextContent'
import { ImageComponent, ImageComponentTemplate } from '../components/ImageComponent'
import { ButtonComponent, ButtonComponentTemplate } from '../components/ButtonComponent'
import getBlogPosts from '../utils/getBlogPosts'
import { BlogPost } from './blog'
import { BlogCard } from '../components/BlogCard'

const formOptions = {
  label: 'Page',
  fields: [
    { name: 'title', component: 'text' }
  ]
}

interface Props { file: GitFile, allPages: string[], allBlogs: string[], global: any, posts?: BlogPost[] }

export const GridContainer = ({ innerRef, children }: { innerRef: any, children: any }) => (
  <Grid templateColumns="1fr repeat(12, minMax(auto, 92px)) 1fr" ref={innerRef} overflow={'hidden'}>
    {children}
  </Grid>
)

export default function Page ({ file, allPages, allBlogs, global, posts = [] }: Props) {
  const blogPosts = posts.slice(0, 3)
  useCreatePage(allPages)
  useCreateBlogPage(allBlogs)
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
      {!!blogPosts.length && <Box maxW='xl' justifyContent='center' m='auto' p='10'>
        <Heading textAlign='center' p='10' style={{ color: '#666666', fontWeight: 400, fontSize: '3rem' }}>Our Blog</Heading>
        <Flex flexWrap={'wrap'} justify={'center'}>
          {blogPosts.map(BlogCard)}
        </Flex>
      </Box>}
    </Layout>
  )
}

const PAGE_BLOCKS = {
  textContent: {
    Component: TextContent,
    template: TextContentTemplate
  },
  image: {
    Component: ImageComponent,
    template: ImageComponentTemplate
  },
  button: {
    Component: ButtonComponent,
    template: ButtonComponentTemplate
  }
}

// /**
//  * Fetch data with getStaticProps based on 'preview' mode
//  */
export const getStaticProps = async function ({ preview, previewData }) {
  const global = await getGlobalStaticProps(preview, previewData)
  const posts = await getBlogPosts(preview, previewData, 'content/blog')
  const allPages = (await getLocalFiles('content') || []).map((fileName) => fileName.replace('content/', '').replace('.json', ''))
  const allBlogs = (await getLocalFiles('content/blog') || []).map((fileName) => fileName.replace('content/blog/', '').replace('.json', ''))
  const fileRelativePath = 'content/index.json'
  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          allPages,
          global,
          posts,
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
          posts,
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

  const content = (await import('../content/index.json')).default

  return {
    props: {
      global,
      allPages,
      posts,
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
