import * as Bluebird from 'bluebird'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as path from 'path'
import * as rawFs from 'fs'
import * as serveStatic from 'serve-static'

import App from './App'
import { StaticRouter } from 'react-router-dom'
import { createServer } from 'http'
import fetch from 'node-fetch'
import { template } from 'lodash'

const fs: any = Bluebird.promisifyAll(rawFs)
const port = process.env.PORT || 8080
const serve = serveStatic('dist')

function startServer (html: string): void {
  process.stdout.write('Server is starting..\n')
  createServer((req, res) => {
    console.log(req.url)
    if (req.url.endsWith('.js') || req.url.endsWith('.json')) {
      serve(req, res, (error: Error) => {
        if (error) process.stderr.write(error.message)
      })
    }

    if (!req.url.endsWith('.js') && !req.url.endsWith('.json')) {
      const reactHtml = ReactDOMServer.renderToString(
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <App />
        </StaticRouter>
      )
      const compiledTemplate = template(html)
      res.end(compiledTemplate({content: reactHtml}))
    }

  }).listen(port, (err: Error) => {
    if (!err) process.stdout.write(`server started at port ${port}\n`)
    else throw err
  })
}

process.stdout.write('fetching floor map and waypoints\n')
fetch(
  'https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1&lang=de'
)
  .then(res =>
    res.body.pipe(fs.createWriteStream(path.resolve('./dist/map_floor.json')))
  )
  .then(() => process.stdout.write('fetch done\n') && null)
  .then(() => fs.readFileAsync(path.resolve('./src/index.html'), 'utf8'))
  .then((html) => startServer(html))
  .catch(err => process.stderr.write(`error while starting server: ${err}\n`))
