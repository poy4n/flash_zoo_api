const express = require('express')
const router = express.Router();
const Word = require('../models/word');

const axios = require('axios')


// translate word to target language
router.post('/words/translate', (req,res) => {
    // check DB for translation
    // console.log(req.body.lang)
    // console.log(req.body.word_id)

    Word
        .findWordByLanguage(req.body.lang, req.body.word_id)
        
        .then(query_res => {
            // if yes - return result
            // console.log(query_res.rows[0]["?column?"])
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
                // console.log(translationURL)
                axios.get(translationURL).then(({ data }) => {
                    // console.log(data)
                    // console.log(req.body.lang)
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
// const unsplashKey1 = 'fyrLKNWhabtDIvwOgb_51aJ4PSmhmdZOn_8NHlqPlXo'
// const unsplashKey2 = 'aQzSvTmni6PlAWA5D55d07ydKUx2l2t5ibbZpaz_F6Q'
// const masterKey = unsplashKey1

// add image to table
router.post('/words', (req, res) => {
    // console.log(req.body)
    //check DB for image
    Word
        .findImage(req.body.word_id)
        .then(query_res => {
            // console.log(query_res.rows[0])
            // console.log(query_res.rows.length)
            if(query_res.rows.length !== 0 && query_res.rows[0].image_url !== null) {
                // if yes - return result
                return res.json({results: query_res.rows})

            } else {
                // console.log(query_res.rows[0].english)
                // if no - search api for image url and save in DB and return result
                const url = `https://api.unsplash.com/search/photos?client_id=${ process.env.UNSPLASH_KEY }&query=${query_res.rows[0].english}&per_page=1`
                console.log(url)
                
                axios.get(url).then(({ data }) => {
                    
                    console.log(data.results[0])
                    // console.log(data.results[0].urls.small)
                    let image = "./images/empty.jpg"
                    if(data.results.length > 0) {
                        image = data.results[0].urls.small
                    }
    
                    Word
                        .addImage(image, query_res.rows[0].english, req.body.word_id )
                        .then(query_res_update => {
                            console.log(query_res_update.rows)
                            // console.log();
                            
                            res.json({ results: query_res_update.rows})
                    })
                        
                })
            }
        });
});

router.get('/words', (req, res) => {
    const userData = JSON.parse(req.query.userInfo)

    // construct random number
    let randomNum = 7

    Word
        .generateWord(userData.language, randomNum)
        .then(queryRres => res.json(queryRres.rows))
})

module.exports = router;