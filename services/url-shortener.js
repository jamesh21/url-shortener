const crypto = require("crypto");
const shortenUrl = (longUrl) => {
    return crypto.createHash("sha256").update(longUrl).digest("base64url").slice(0, 6);
}

module.exports = shortenUrl