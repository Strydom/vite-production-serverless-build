// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
import express from 'express'
import { renderPage } from 'vite-plugin-ssr/server'
import { root } from './root'
import process from "process";
import UAParser from "ua-parser-js";

const isProduction = process.env.NODE_ENV === 'production'

const app = express()
app.disable('x-powered-by')

if (isProduction) {
  app.use(express.static(`${root}/dist/client`))
} else {
  const vite = await import('vite')
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true }
    })
  ).middlewares
  app.use(viteDevMiddleware)
}

app.get('*', async (req, res, next) => {
  const userAgent = new UAParser(req.headers['user-agent'])
  const deviceType = userAgent.getDevice().type || 'desktop'
  const pageContextInit = {
    urlOriginal: req.originalUrl,
    deviceType
  }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) return next()
  const { body, statusCode, contentType } = httpResponse
  res.status(statusCode).type(contentType).send(body)
})

export {
  app
}