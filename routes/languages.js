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

router.post('/', async function(req, res, next) {
    try {
        res.json(await languages.create(req.body));
    } catch (err) {
        console.error(`Error while creating new language.`, err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        res.json(await languages.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating language.`, err.message);
        next(err);
    }
});

module.exports = router;