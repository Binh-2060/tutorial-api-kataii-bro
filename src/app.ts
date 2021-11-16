import environment from './environment'
import * as express from 'express'
import { urlencoded } from 'body-parser'
import * as cors from 'cors'
import * as expressSanitizer from 'express-sanitizer'
import { resolve } from 'path'
import { config } from 'dotenv'
import * as bodyParser from 'body-parser'
import { existsSync, mkdirSync } from 'fs'
import { RotatingFileStream, createStream } from 'rotating-file-stream'
import morgan = require('morgan')
import { connectDatabase } from './db'
import api from './api'
import upload from './util/upload'

config({ path: resolve(__dirname, '../.env') })

const app = express()

const baseUrl = `/api/v${environment.api_version}`

// logging
const logDirectory = resolve(__dirname, '..', 'log')
existsSync(logDirectory) || mkdirSync(logDirectory)
const accessLogStream: RotatingFileStream = createStream('access.log', {
  interval: '1d',
  path: logDirectory,
})

// static files
//app.use(static(resolve(__dirname, './../dist')));

app.use(morgan('combined', { stream: accessLogStream }))

// support application/json type post data
app.use(express.json())

// support application/x-www-form-urlencoded post data
app.use(urlencoded({ extended: false }))

// set default res headers
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  )

  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(expressSanitizer())

// include static path
app.use('/uploads', express.static(resolve('uploads')))

// enable cors
app.use(cors())

// test db connection
connectDatabase()

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.path}`)
  if (Object.entries(req.query).length > 0) {
    console.log('query params:')
    Object.keys(req.query).forEach((key) =>
      console.log(` - ${key}: ${req.query[key]}`)
    )
  }
  if (Object.entries(req.body).length > 0) {
    console.log('request body:')
    Object.keys(req.body).forEach((key) =>
      console.log(` - ${key}: ${req.body[key]}`)
    )
  }
  console.log()
  next()
})

// import apis
app.use(baseUrl, api)

export default app
