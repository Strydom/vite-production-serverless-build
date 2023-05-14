import React from 'react'
import { PageContextContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import { Link } from './Link'
import { Copyright as CopyrightIcon } from '@mui/icons-material'
import { Box, BoxProps, CssBaseline, CssVarsProvider, Typography } from "@mui/joy"
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID
} from '@mui/material';

const materialTheme = materialExtendTheme();

export function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <CssVarsProvider>
          <CssBaseline/>
          <PageContextContextProvider pageContext={pageContext}>
            <Layout>
              {children}
            </Layout>
          </PageContextContextProvider>
        </CssVarsProvider>
      </MaterialCssVarsProvider>
    </React.StrictMode>
  )
}

function Layout({ children, ...props }: BoxProps) {
  return <Box {...props}>
    <Header/>
    {children}
    <Footer/>
  </Box>
}

function Header({}: BoxProps) {
  return <Box padding={'0 1rem 1rem 1rem'} display={'flex'} alignItems={'center'}>
    <Link href={"/"}>
      <Typography level={'h1'} component={"p"}>Home</Typography>
    </Link>
  </Box>
}

function Footer({}: BoxProps) {
  return <Box padding={'4rem 1rem 1rem 1rem'}>
    <Typography level={'h1'} component={"p"}>Home</Typography>
    <Typography level={'body1'} startDecorator={<CopyrightIcon/>}>Copyright 2023</Typography>
  </Box>
}
