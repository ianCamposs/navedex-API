import express, { Response, Request, NextFunction} from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import createConnection from './database'
import AppError from './errors/AppError'
import router from './routes'
require('dotenv').config()



createConnection()
const app = express()

app.use(express.json())
app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }
    
    console.log('err', err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

export default app