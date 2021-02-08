import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import React from 'react'
import { theme } from 'theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
