const express = require('express')
const app = express()

const port = 3000

// Create a new short URL
// Retrieve an original URL from a short URL
// Update an existing short URL
// Delete an existing short URL
// Get statistics on the short URL (e.g., number of times accessed)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})