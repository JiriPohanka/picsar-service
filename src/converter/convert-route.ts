import express from 'express'
import multiparty from 'multiparty'
import ConvertParams from "./convert-params"
const router = express.Router()

const convertService = require('./convert-service')()

interface RequestWithData extends express.Request {
    data: ConvertParams
}

router.post('/convert', (req: RequestWithData, res, next) => {
    const form = new multiparty.Form()
    form.on('error', (err) => {next(err)})
    form.on('part', (part) => {
        if (!part.filename) { return part.resume() }

        const converter = convertService.getConverter(req.data)
        converter.on('info', (info) => {
            res.set('Content-Length', info.size)
            res.set('Content-Type', `image/${info.format}`)
        })

        part.pipe(converter).pipe(res)
    })

    form.on("field", (name, value) => {
        req.data = req.data || {}
        req.data[name] = value
    })

    form.parse(req)
})

export default router