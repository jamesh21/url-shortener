const shortenUrl = require('../services/url-shortener')
const Url = require('../models/Url')

// Create a new short URL
const createShortUrl = async (req, res) => {
    const { url } = req.body
    // create shortened url
    const shortCode = shortenUrl(url)
    // map origin url with shorten url
    const urlData = await Url.create({ shortCode, url });

    res.status(201).json({ data: urlData })
}

// Retrieve an original URL from a short URL
const getShortUrl = async (req, res) => {
    const { short } = req.params
    // Use short URL to get original URL
    // query db to get origin url
    // increment access count of this short url
    const url = await Url.findOneAndUpdate({ shortCode: short }, { $inc: { accessCount: 1 } }, { new: true }).select('-accessCount')
    // if short url is not available, return 404
    if (!url) {
        return res.status(404).json({ res: 'not Found' })
    }
    res.status(200).json({ url })
}

// Update an existing short URL
const updateShortUrl = async (req, res) => {
    const { short } = req.params
    const { url } = req.body
    // Need to update updatedDate fieldz
    const urlData = await Url.findOneAndUpdate({ shortCode: short }, { $set: { updatedAt: new Date(), url } }, { new: true }).select('-accessCount')
    if (!urlData) {
        return res.status(400).json({ res: 'Bad Request' })
    }
    res.status(200).json({ urlData })
}

// Delete an existing short URL
const deleteShortUrl = async (req, res) => {
    // Use short URL to delete entry
    const { short } = req.params
    const url = await Url.findOneAndDelete({ shortCode: short })
    if (!url) {
        return res.status(404).json({ res: 'not Found' })
    }
    res.status(204).send()
}

// Get statistics on the short URL (e.g., number of times accessed)
const getShortUrlStats = async (req, res) => {
    const { short } = req.params
    const url = await Url.findOneAndUpdate({ shortCode: short })
    if (!url) {
        return res.status(404).json({ res: 'not Found' })
    }
    res.status(200).json({ url })
}

module.exports = { getShortUrlStats, deleteShortUrl, getShortUrl, createShortUrl, updateShortUrl }

