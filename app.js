require("dotenv").config();
const express = require('express')
const app = express()
const shortenUrl = require('./services/url-shortener')
const connectDB = require('./db/connect')
const Url = require('./models/Url')
app.use(express.json());

// Create a new short URL
app.post('/api/v1/shorten', async (req, res) => {
    const { url } = req.body
    // create shortened url
    const tinyUrl = shortenUrl(url)
    const urlData = await Url.create({ tinyUrl, originUrl: url });
    // map origin url with shorten url
    // return something in this format 
    // {
    //     "id": "1",
    //     "url": "https://www.example.com/some/long/url",
    //     "shortCode": "abc123",
    //     "createdAt": "2021-09-01T12:00:00Z",
    //     "updatedAt": "2021-09-01T12:00:00Z"
    // }

    res.status(201).json({ data: urlData })
})

// Retrieve an original URL from a short URL
app.get('/api/v1/shorten/:url', (req, res) => {
    // Use short URL to get original URL
    // if short url is not available, return 404
    // query db to get origin url
    // increment access count of this short url
    res.send('get original url')
})

// Update an existing short URL
app.put('/api/v1/shorten/:url', (req, res) => {
    res.send('update url')
})

// Delete an existing short URL
app.delete('/api/v1/shorten/:url', (req, res) => {
    // Use short URL to delete entry
    res.send('delete url')
})

// Get statistics on the short URL (e.g., number of times accessed)
app.get('/api/v1/shorten/:url/stats', (req, res) => {
    res.send('get status for url')
})


const port = process.env.PORT || 3000
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer()