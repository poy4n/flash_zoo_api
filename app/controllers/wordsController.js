const express = require('express')
const router = express.Router();
const Word = require('../models/word');

const axios = require('axios')

// add image to table
router.post('/words', (req, res) => {
    console.log(`body: ${req.body}`)
    //check DB for image
    Word
        .findImage(req.body.word_id)
        .then(query_res => {
            console.log(query_res.rows[0])
            console.log(query_res.rows.length)
            if(query_res.rows.length !== 0 && query_res.rows[0].image_url !== null) {
                
                // if yes - return result
                return res.json({image_url: query_res.rows})

            } else {
                console.log(query_res.rows[0].english)
                // if no - search api for image url and save in DB and return result
                const url = `https://api.unsplash.com/search/photos?client_id=fyrLKNWhabtDIvwOgb_51aJ4PSmhmdZOn_8NHlqPlXo&query=${query_res.rows[0].english}&per_page=1`
                console.log(url)
                
                axios.get(url).then(({ data }) => {
                    
                    console.log(data.results)
                    Word
                        .addImage(data.results[0].urls.small, query_res.rows[0].english, req.body.word_id )
                        .then(query_res_update => res.json({ results: query_res_update.rows}))
                        
                })
            }
        });
});

module.exports = router;