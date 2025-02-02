const shortenUrl = require('../services/url-shortener')
const Url = require('../models/Url')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// Create a new short URL
const createShortUrl = async (req, res) => {
    const { url } = req.body
    // regex for checking if string is in url format
    const urlRegex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/

    // Checking if URL was passed in
    if (!url || (!urlRegex.test(url))) {
        throw new BadRequestError('url must be passed in and has to be in the correct url format')
    }

    // map origin url with shorten url
    const urlData = await Url.create({ url });
    // create shortened url
    const shortCode = shortenUrl(urlData._id)
    urlData.shortCode = shortCode
    urlData.save()
    res.status(StatusCodes.CREATED).json({ data: urlData })
}

// Retrieve an original URL from a short URL
const getShortUrl = async (req, res) => {
    const { short } = req.params
    // query db to get origin url
    // increment access count of this short url
    const url = await Url.findOneAndUpdate({ shortCode: short }, { $inc: { accessCount: 1 } }, { new: true }).select('-accessCount')
    // if short url is not available, return 404
    if (!url) {
        throw new NotFoundError(`The short url ${short} was not found`)
    }
    res.status(StatusCodes.OK).json({ url })
}

// Update an existing short URL
const updateShortUrl = async (req, res) => {
    const { short } = req.params
    const { url } = req.body
    // regex for checking if string is in url format
    const urlRegex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/

    // Checking if URL was passed in
    if (!url || (!urlRegex.test(url))) {
        throw new BadRequestError('url must be passed in and has to be in the correct url format')
    }
    // Need to update updatedDate fieldz
    const urlData = await Url.findOneAndUpdate({ shortCode: short }, { $set: { updatedAt: new Date(), url } }, { new: true }).select('-accessCount')
    if (!urlData) {
        throw new NotFoundError(`The short url ${short} was not found`)
    }
    res.status(StatusCodes.OK).json({ urlData })
}

// Delete an existing short URL
const deleteShortUrl = async (req, res) => {
    // Use short URL to delete entry
    const { short } = req.params
    const url = await Url.findOneAndDelete({ shortCode: short })
    if (!url) {
        throw new NotFoundError(`The short url ${short} was not found`)
    }
    res.status(StatusCodes.NO_CONTENT).send()
}

// Get statistics on the short URL (e.g., number of times accessed)
const getShortUrlStats = async (req, res) => {
    const { short } = req.params
    const url = await Url.findOneAndUpdate({ shortCode: short })
    if (!url) {
        throw new NotFoundError(`The short url ${short} was not found`)
    }
    res.status(StatusCodes.OK).json({ url })
}

module.exports = { getShortUrlStats, deleteShortUrl, getShortUrl, createShortUrl, updateShortUrl }

