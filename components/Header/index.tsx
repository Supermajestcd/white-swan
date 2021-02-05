import { useEffect, useState } from 'react'
import { Flex, Box, useMediaQuery, Menu, MenuList, MenuItem, MenuButton, Link as UILink, Popover, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImageComponent } from '../Image'

interface NavItem {
  name: string
  link: string,
  id: string
  navigation: {
    name: string
    link: string
    id: string
  }[]
}

interface Props {
  data?: {
    header: {
      navigation: NavItem[]
    }
  }
}

const LargerNavItem = ({ name, link, navigation, id }: NavItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (navigation) {
    return (
      <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} style={{ display: 'contents' }}>
        <Popover isOpen={isOpen} autoFocus={false} placement='bottom-start'>
          <PopoverTrigger>
            <span></span>
          </PopoverTrigger>
          <PopoverContent width='max-content'>
            {navigation.map(({ name, link, id }) => (
              <Link href={link} key={id} passHref>
                <UILink p='4' _hover={{ textDecoration: 'underline' }}>
                  {name}
                </UILink>
              </Link>
            ))}
          </PopoverContent>
        </Popover>
        <Link href={link} key={id} passHref>
          <UILink p='4' _hover={{ textDecoration: 'underline' }}>
            {name}
          </UILink>
        </Link>
      </div>
    )
  }
  return (
    <Link href={link} key={id} passHref>
      <UILink p='4' _hover={{ textDecoration: 'underline' }}>
        {name}
      </UILink>
    </Link>
  )
}

export const Header = ({ data }: Props) => {
  const router = useRouter()
  const [isLargeScreen] = useMediaQuery('(min-width: 900px)')
  const [Nav, setNav] = useState(null)
  useEffect(() => {
    const navigation = data?.header?.navigation || []
    if (isLargeScreen) {
      setNav(navigation.map((args, index) => <LargerNavItem {...args} key={index} />))
    } else {
      setNav(<Menu>
        <MenuButton>Menu</MenuButton>
        <MenuList>
          {navigation.map(({ name, link, id, navigation }) => (
            <>
            <MenuItem key={id} className={router.pathname ? 'active' : ''}>
              <Link href={link}><a className={router.pathname ? 'active' : ''}>{name}</a></Link>
            </MenuItem>
            {navigation?.map(({ name, link, id }) => (
              <MenuItem key={id} className={router.pathname ? 'active' : ''} marginLeft='6'>
                <Link href={link}><a className={router.pathname ? 'active' : ''}>{name}</a></Link>
              </MenuItem>
            ))}
            </>
          ))}
        </MenuList>
      </Menu>)
    }
  }, [isLargeScreen, data])

  return (
    <Box bg='white' boxShadow="base" as='header'>
      <Flex maxW='xl' m='auto' p='3' justify='space-between' align={'center'}>
        <Link href='/'>
          <>
            <ImageComponent src='/logo.png' width='60px' alt='logo' />
          </>
        </Link>
        <Flex>
          {Nav}
        </Flex>
      </Flex>
    </Box>
  )
}
