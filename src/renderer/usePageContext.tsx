// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from 'react'
import type { PageContext } from './types'

const PageContextContext = React.createContext<PageContext>(undefined as any)

export function PageContextContextProvider({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  return <PageContextContext.Provider value={pageContext}>{children}</PageContextContext.Provider>
}

export function usePageContext() {
  return useContext(PageContextContext)
}
