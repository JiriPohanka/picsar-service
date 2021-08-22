import express from 'express'
const router = express.Router()

router.get('/healthcheck', (req, res) => {
    res.setHeader("Surrogate-Control", "no-store")
    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    )
    res.setHeader("Pragma", "no-cache")
    res.setHeader("Expires", "0")
    res.status(200).json({status: 'healthy'})
})

module.exports = router