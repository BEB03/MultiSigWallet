const express = require("express");
const wallet = require("../controllers/wallet");

const router = express.Router();

router.get("/", wallet.get);
router.post("/", wallet.create);
router.delete("/", wallet.delete);

module.exports = router;
