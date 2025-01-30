const express = require("express");
const router = express.Router();
const {
    getShortUrlStats, deleteShortUrl, getShortUrl, createShortUrl, updateShortUrl }
    = require("../controllers/shorten");

router.route("/").post(createShortUrl);
router
    .route("/:short")
    .get(getShortUrl)
    .delete(deleteShortUrl)
    .put(updateShortUrl);
router.route("/:short/stats").get(getShortUrlStats)
module.exports = router;