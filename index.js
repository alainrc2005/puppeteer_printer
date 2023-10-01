require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { generate } = require('./pdf')
const colors = require('colors/safe')

const logger = (msg) => {
  const now = new Date()
  console.log(now.toLocaleDateString(), now.toLocaleTimeString(), msg)
}

logger(colors.green(`Echo Server using port: ${process.env.SOCKET_PORT || 5000}`))
if (process.env.VERBOSE) {
  logger(colors.green(`Verbose: ${process.env.VERBOSE ? 'On' : 'Off'}`))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/pdf', async (req, res) => {
  await generate(req.body)
  res.status(200).end()
})

server.listen({
  port: process.env.SOCKET_PORT || 5000
})

