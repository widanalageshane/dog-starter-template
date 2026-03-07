import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../services/app'

describe('Assignment 5 API tests', () => {
  it('Test 1: should return random dog image successfully', async () => {
    const response = await request(app).get('/api/dogs/random')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.imageUrl).toBeDefined()
    expect(typeof response.body.data.imageUrl).toBe('string')
  })

  it('Test 2: should return 404 and an error message for invalid route', async () => {
    const response = await request(app).get('/api/dogs/invalid')

    expect(response.status).toBe(404)
    expect(response.body).toBeDefined()

    expect(
      response.body.message || response.body.error || response.text
    ).toBeDefined()
  })
})