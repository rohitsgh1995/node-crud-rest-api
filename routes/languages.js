const express = require('express');
const router = express.Router();
const languages = require('../services/languages');

router.get('/', async function (req, res, next) {
    try {
        res.json(await languages.getMultiple(req.query.page));
    }
    catch (err) {
        console.error(`Error while getting languages`, err.message);
        next(err);
    }
});

module.exports = router;