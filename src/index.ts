import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
const app = express()

const PORT = 3000

// app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: '*',
    credentials: true,
}))

// logging
app.use('/convert*', (req, res, next) => {
    res.on('finish', () => {
        const isSuccess = res.statusCode < 400 ? true : false
        const str1 = `[${req.method} ${req.path}]`
        const str2 = `${res.statusCode} ${res.statusMessage}`
        const coloredStr2 = isSuccess ? chalk.green(str2) : chalk.red(str2)
        console.log(`${str1} ${coloredStr2}`)
    })
    next()
})

const healthcheckRouter = require('./healthcheck')
const convertRouter = require('./converter/convert-route')

app.use('/', [healthcheckRouter, convertRouter])

app.listen(PORT, () => console.log('App running on port ' + PORT))