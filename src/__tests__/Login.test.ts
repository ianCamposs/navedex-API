import request from 'supertest'
import createConnection from '../database'
import app from '../app'
import {getConnection} from 'typeorm'


describe('Login', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to login with email and password and receive a JWT', async () => {
    await request(app).post('/signup').send({
      email: 'testeJWT@gmail.com',
      password: 'password test'
    })
    
    const response = await request(app).post('/login').send({
      email: 'testeJWT@gmail.com',
      password: 'password test'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('webtoken')
  })
})