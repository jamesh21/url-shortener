# URL Shortener API

## Project Description

This project is a URL shortener API built using Node.js and Express. The purpose of this project is to practice creating a REST API and storing data on MongoDB. Each short URL created will be unique, even if the same origin URL is passed in during creation.

## API Endpoints


### URL Shortener Routes

1. `GET /api/v1/shorten/:shortUrl` - Retrieves the original url given the short url
2. `GET /api/v1/shorten/:shortUrl/stats` - Retrieves the number of times this short url was retrieved
3. `POST /api/v1/shorten` - Creates a short URL based on the original URL passed in with the body request
4. `DELETE /api/v1/shorten/:shortUrl` - Deletes the passed in short URL's record in the DB
5. `PUT /api/v1/shorten/:shortUrl` - Updates the passed in short URL's original URL with the passed in URL in body

## Requirements

[Node.js](https://nodejs.org/en)\
[MongoDB](https://www.mongodb.com/)

## Setup

1. Clone repo
2. run `npm install`
3. Create .env file and Add environmental variables below
    - MONGO_URI (URI of your MongoDB instance)
    - PORT (Port where you want the server to be ran on, will default to 3000 if nothing is provided)
4. Start up MongoDB instance if running locally
5. run `npm start` to start server


## Credits

This project idea is from [roadmap.sh](https://roadmap.sh/projects/url-shortening-service)
