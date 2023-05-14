import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import type { PageContextServer } from './types'

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext

  // https://vite-plugin-ssr.com/render-modes
  let pageHtml: string = '' // SPA
  if (Page) {
    // SSR / HTML-only
    pageHtml = ReactDOMServer.renderToString(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    )
  }

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = documentProps?.title || 'Hello world'
  const desc = documentProps?.description || 'Hello world'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here,
      // which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps']