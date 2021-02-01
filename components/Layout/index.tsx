import { useFormScreenPlugin } from 'tinacms'
import { Header } from '../Header'
import { Box, Text } from '@chakra-ui/layout'
import { useGithubJsonForm } from 'react-tinacms-github'
import { ReactNode } from 'react'
import { Container } from './styles'
import { headerForm } from './headerForm'

interface Props {
  children: ReactNode,
  global?: any
}
const dummyGlobal = {
  props: {
    file: {}
  }
}

export const Layout = ({ children, global = dummyGlobal }: Props) => {
  const [data, hForm] = useGithubJsonForm(global.props.file, headerForm)
  useFormScreenPlugin(hForm)
  return (
    <>
      <Header data={data}/>
        <Container>
          {children}
        </Container>
      <Box as='footer' borderTop='solid 1px #E2E8F0' mt='10'>
        <Box maxW='xl' justifyContent='center' m='auto' p='10'>
          <Text fontSize="xs" color="#666666" textAlign='center'> White Swan is a registered charity in England and Wales (1176486). Registered office: 15th Floor, WeWork Building, 10 York Road, London, SE1 7ND </Text>
        </Box>
      </Box>
    </>
  )
}
