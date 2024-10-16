import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  GithubClient,
  TinacmsGithubProvider
} from 'react-tinacms-github'
import { NextGithubMediaStore } from 'next-tinacms-github'
import { DateFieldPlugin } from 'react-tinacms-date'

const sizes = {
  sm: '400px',
  md: '600px',
  lg: '900px',
  xl: '1100px'
}

const theme: any = extendTheme({ sizes })

const TRACKING_ID = 'G-7S5X8GGLGL'
const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch('/api/preview', { headers: headers })
  const data = await resp.json()

  if (resp.status === 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload()
  })
}

export default class Site extends App {
  cms: TinaCMS

  constructor (props) {
    super(props)
    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
      authScope: 'public_repo'
    })

    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        github
      },
      media: new NextGithubMediaStore(github),
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview
    })
    this.cms.plugins.add(DateFieldPlugin)
    import('react-tinacms-editor').then(
      ({ HtmlFieldPlugin }) => {
        this.cms.plugins.add(HtmlFieldPlugin)
      }
    )
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <title>{pageProps.file?.data?.title}</title>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          <ChakraProvider theme={theme}>
              <Component {...pageProps} />
              <EditLink cms={this.cms} />
          </ChakraProvider>
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <button onClick={() => cms.toggle()} style={{ padding: 10, fontSize: 18, opacity: 0.6 }}>
      {cms.enabled ? 'Exit Edit Mode' : '✎'}
    </button>
  )
}
