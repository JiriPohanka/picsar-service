import request from "supertest"
import express from "express"
import sharp from 'sharp'
const app = express()

import convertRoute from '../src/converter/convert-route'

app.use('/', convertRoute)

describe('converter', () => {
    test('default convert', async () => {
        const expectedSize = 24967

        const response = await request(app)
            .post('/convert')
            .attach('image', 'test/test-image.jpg')
            .expect(200)
            .expect('Content-Type', 'image/jpeg')
            .expect('Content-Length', expectedSize.toString())

        expect(response.body).toBeInstanceOf(Buffer)
        expect(response.body.length).toBe(expectedSize)
    })

    test('resize', async () => {
        const response = await request(app)
            .post('/convert')
            .field('resize', '200,200')
            .attach('image', 'test/test-image.jpg')
            .expect(200)

        const metadata = await sharp(response.body).metadata()
        expect(metadata.width).toBe(200)
        expect(metadata.height).toBe(200)
    })

    test('grayscale', async () => {
        const response = await request(app)
            .post('/convert')
            .field('greyscale', 'on')
            .attach('image', 'test/test-image.jpg')
            .expect(200)

        expect(response.body.length).toBe(21569)
    })
})
