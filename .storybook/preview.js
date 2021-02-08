import { css, ThemeProvider } from '@emotion/react'
import { Web3Provider } from '@ethersproject/providers'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import Web3ReactManager from 'components/Web3ReactManager/Web3ReactManager'
import * as nextImage from 'next/image'
import React from 'react'
import { dark, light } from 'theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  dependencies: {
    withStoriesOnly: true,
    hideEmpty: true,
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
  web3: {
    name: 'Web3',
    description: 'Connect to a web3 provider',
    defaultValue: '',
    toolbar: {
      icon: 'unlock',
      items: ['connect wallet'],
    },
  },
}

const baseCss = css`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height } = props
    const ratio = (height / width) * 100
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative',
        }}>
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          {...props}
        />
      </div>
    )
  },
})

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

const withProviders = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? dark : light
  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <main css={baseCss}>
            <Story />
          </main>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </ThemeProvider>
  )
}

export const withWeb3 = (Story) => {
  return (
    <Web3ReactManager>
      <Story />
    </Web3ReactManager>
  )
}

export const decorators = [withProviders]
