const express = require('express')
const router = express.Router();
const Word = require('../models/word');

const axios = require('axios')


// translate word to target language
router.post('/words/translate', (req,res) => {
    // check DB for translation
    Word
        .findWordByLanguage(req.body.lang, req.body.word_id)
        
        .then(query_res => {
            // if yes - return result
            console.log(query_res.rows[0]["?column?"])
            if(query_res.rows.length > 0 && query_res.rows[0]["?column?"] !== req.body.lang) {
                res.json({lang: query_res.rows})
            } else {
                // if no use api to translate to target language
                var languageMap = {
                    "french": "fr",
                    "german": "de",
                    "italian": "it",
                    "english": "en"
                }
                const translationURL  = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200218T030911Z.900aa123111d6f2a.3acf5f5e1ab7f63a4f91d451aaea0cefc7970bda&text=${query_res.rows[0]["english"]}&lang=en-${languageMap[req.body.lang]}`
                console.log(translationURL)
                axios.get(translationURL).then(({ data }) => {
                    // console.log(data)
                    console.log(req.body.lang)
                    Word
                        .translateWord(req.body.lang, data.text[0], req.body.word_id )
                        .then(query_res_update => res.json({ results: query_res_update.rows}))
                        .catch(err =>
                            setImmediate(() => {
                                throw err
                            }))  
                });
            }
        })
})

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
                // console.log(url)
                axios.get(url).then(({ data }) => {
                    console.log(data.results)
                    Word
                        .addImage(data.results[0].urls.small, query_res.rows[0].english, req.body.word_id )
                        .then(query_res_update => res.json( {results: query_res_update.rows}))       
                });
            }
        });
});

// generate 7 words from the table
// router.get('/words/memory', (req,res) => {
//     Word
//     .generateWord(req.body.lang, )
//     .then()
// })


module.exports = router;