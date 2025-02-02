require("dotenv").config();
// library that wraps all async function in try catch block
require("express-async-errors");
const express = require('express')
const app = express()
const shortenRouther = require('./routes/shorten')
const connectDB = require('./db/connect')
const notFoundHandler = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const rateLimiter = require("express-rate-limit");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
app.set("trust proxy", 1); // if using rate limiter with reverse proxy, this needs to be included
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/shorten', shortenRouther)

app.use(notFoundHandler)
app.use(errorHandler)


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