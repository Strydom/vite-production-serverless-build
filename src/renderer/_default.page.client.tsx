export { render }

import React from 'react'
import { hydrateRoot, createRoot, Root } from 'react-dom/client'
import { PageShell } from './PageShell'
import type { PageContextClient } from './types'

export const clientRouting = true
export const hydrationCanBeAborted = true

let root: Root
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext

  const page = <PageShell pageContext={pageContext}>
    <Page {...pageProps} />
  </PageShell>

  const container = document.getElementById('page-view')!
  if (
    // We detect SPAs by using the fact that `innerHTML === ''` for the first render of an SPA
    container?.innerHTML === '' ||
    // Upon Client Routing page navigation, vite-plugin-ssr sets `pageContext.isHydration`
    // to `false`.
    !pageContext.isHydration
  ) {
    // - SPA pages don't have any hydration steps: they need to be fully rendered.
    // - Page navigation of SSR pages also need to be fully rendered (if we use Client Routing)
    if (!root) {
      root = createRoot(container)
    }
    root.render(page)
  } else {
    // The first render of SSR pages is merely a hydration (instead of a full render)
    root = hydrateRoot(container, page)
  }
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
