const express = require('express');

const router = express.Router();
const card = require('../models/card');


// create card user record at the end of the round
router.post('/card/play', (req, res) => {
    const data = JSON.parse(req.body.data)
    card.newCard(data)
    res.json({ message: 'added to db!'})
})



module.exports = router;