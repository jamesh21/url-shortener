require("dotenv").config();
const express = require('express')
const app = express()
const shortenRouther = require('./routes/shorten')
const connectDB = require('./db/connect')

app.use(express.json());
app.use('/api/v1/shorten', shortenRouther)

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