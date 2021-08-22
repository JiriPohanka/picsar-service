const sharp = require('sharp')

module.exports = () => {

    const convertFile = (fileStream, params, resStream) => {

    }

    const getConverter = () => {
        return sharp()
            .grayscale()
    }

    return {
        convertFile,
        getConverter,
    }
}