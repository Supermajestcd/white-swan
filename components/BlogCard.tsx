import { Flex, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { BlogPost } from '../pages/blog'

export const BlogCard = ({ data, fileName }: BlogPost) => (
  <Link href={`/blog/${fileName}`} key={data.title} passHref>
    <Flex maxW="sm" borderWidth="1px" borderRadius="lg" p='5' m={'5'} direction={'column'} cursor={'pointer'}>
      <Text as='h4'>{data.title}</Text>
      <Text pb='4'>{new Date(data.date).toDateString()}</Text>
      <Text my={'4'}>{data.description}</Text>
      <Button my={'4'} mt={'auto'}>READ MORE</Button>
    </Flex>
  </Link>
)
