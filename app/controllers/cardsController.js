const express = require('express');

const router = express.Router();
const card = require('../models/card');


// create card user record at the end of the round
router.post('/card/play', (req, res) => {
    const data = JSON.parse(req.body.data)
    card.newCard(data)
    res.json({ message: 'added to db!'})
})

// finds all cards by status, user ID and language
router.get('/card/play', (req, res) => {
    card
        .selectCard(req.body.status, req.body.user_id, req.body.language)
        .then(query_res => {
            res.json({ card: query_res.rows})
        })
        .catch(err => 
            setImmediate(() => {
                throw err
            })
        );   
});


module.exports = router;