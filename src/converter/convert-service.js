const sharp = require('sharp')

module.exports = () => {

    const getConverter = (params) => {
        const c = sharp()

        // default
        if (!params) {
            return c
        }

        // resize
        if (params.resize) {
            const [width, height] = params.resize.split(',').map(n => parseInt(n, 10))
            c.resize(width)
        }

        // grayscale
        if (params.greyscale === 'on') {
            c.grayscale()
        }

        return c
    }

    return {
        getConverter,
    }
}