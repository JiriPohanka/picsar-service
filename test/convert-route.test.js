const request = require("supertest")
const express = require("express")
const app = express()

const convertRoute = require('../src/converter/convert-route')

app.use('/', convertRoute)

describe('converter', () => {
    test('default convert', async () => {
        const expectedSize = 21569

        const response = await request(app)
            .post('/convert')
            .attach('image', 'test/test-image.jpg')
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .expect('Content-Length', expectedSize.toString())

        expect(response.body).toBeInstanceOf(Buffer)
        expect(response.body.length).toBe(expectedSize)
    })

})