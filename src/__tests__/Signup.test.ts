import request from 'supertest'
import createConnection from '../database'
import app from '../app'
import {getConnection} from 'typeorm'


describe('Signup', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/signup').send({
      email: 'teste@gmail.com',
      password: 'password test'
    })
    
    expect(response.status).toBe(200)
  })

  it('Should be not able to create a new user with already exists email', async () => {
    const response = await request(app).post('/signup').send({
      email: 'teste@gmail.com',
      password: 'password test'
    })
    
    expect(response.status).toBe(400)
  })
})