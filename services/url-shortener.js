const BASE62_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const shortenUrl = (urlId) => {
    let num = parseInt(urlId.toString().substring(0, 10), 16); // Convert hex to decimal
    let shortURL = "";

    while (num > 0) {
        shortURL = BASE62_ALPHABET[num % 62] + shortURL;
        num = Math.floor(num / 62);
    }

    return shortURL
}

module.exports = shortenUrl