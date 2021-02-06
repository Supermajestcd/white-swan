import { Layout } from '../../components/Layout'
import { Box, Heading, Flex } from '@chakra-ui/layout'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { getGlobalStaticProps } from '../../utils/getGlobalStaticProps'
import getBlogPosts from '../../utils/getBlogPosts'
import { BlogCard } from '../../components/BlogCard'

export interface BlogPost {
  data: {
    date: Date
    title: string
    publish: boolean
    description?: string
  }
  fileName: string
}

interface Props {file: GitFile, posts: BlogPost[], global: any}

export default function Page ({ posts, global }: Props) {
  const publishedPosts = posts.filter(({ data }) => data.publish)
    .sort((a, b) => {
      // @ts-ignore
      return new Date(b.data.date) - new Date(a.data.date)
    })
  return (
    <Layout global={global}>
        <Box maxW='xl' justifyContent='center' m='auto' p='10'>
            <Heading textAlign='center' p='10'>BLOG</Heading>
          <Flex flexWrap={'wrap'} justify={'center'}>
            {publishedPosts.map(BlogCard)}
          </Flex>
        </Box>
    </Layout>
  )
}

// /**
//  * Fetch data with getStaticProps based on 'preview' mode
//  */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const posts = await getBlogPosts(preview, previewData, 'content/blog')
  const global = await getGlobalStaticProps(preview, previewData)
  return {
    props: {
      global,
      posts,
      sourceProvider: null,
      error: null,
      preview: false
    }
  }
}
