import { beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '#src/app'
// import { dropAllTables } from '#src/utils/database'

const api = supertest(app)

beforeEach(async () => {
  // await dropAllTables()
})

test('GET /api/products', async () => {
  await api
    .get('/api/products')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})