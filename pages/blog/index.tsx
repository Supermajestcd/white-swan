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
    description?: string;
    featureImg?: string;
  }
  fileName: string
}

interface Props {file: GitFile, posts: BlogPost[], global: any}

export default function Page ({ posts, global }: Props) {
  console.log(posts);
  return (
    <Layout global={global}>
        <Box maxW='xl' justifyContent='center' m='auto' p='10'>
            <Heading textAlign='center' p='10' style={{ color: '#666666', fontWeight: 400, fontSize: '3rem' }}>Our Blog</Heading>
          <Flex flexWrap={'wrap'} justify={'center'}>
            {posts.map(BlogCard)}
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
