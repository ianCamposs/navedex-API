import express from 'express'
require('dotenv').config()
import 'reflect-metadata'
import createConnection from './database'
import  router  from './routes'



createConnection()
const app = express()

app.use(express.json())
app.use(router)

export default app