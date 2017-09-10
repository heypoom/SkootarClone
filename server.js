const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({dev})
const handle = app.getRequestHandler()

// This allows you to have maximum control over the server-side.
app.prepare().then(() => {
  createServer((req, res) => {
    const url = parse(req.url, true)
    handle(req, res, url)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
