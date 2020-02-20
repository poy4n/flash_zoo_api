const db = require("../../db/db");

// max num of 7 - select random words
function generateWord(foreignLang, randomNum) {
  return db.query("select id, english, $1, image_url from words order by random() limit $2;", [foreignLang, randomNum]);
}

function findWordById(id) {
    return db.query("select * from words where id = $1;", [id])
}

function findWordByLanguage(lang, id) {
    return db.query("select english, $1 from words where id = $2;", [lang, id])
}

// find an image to display already selected in card
function findImage(id) {
  return db.query("select image_url, english from words where id = $1;", [id]);
}

// add / update image from api
function addImage(image_url, english, id) {
  return db.query("update words set image_url = $1 where english = $2 and id = $3 returning *;", [image_url, english, id]);
}         

// insert more languages into db
// function translateWord(german, french, italian, english, id) {
//   return db.query("update words set (german, french, italian) = ($1, $2, $3) where english = $4 and id = $5;", [german, french, italian, english, id]);
// }

function translateWord(lang, value, id) {
    const supportedLanguages = ['french', 'german', 'italian']
    if (supportedLanguages.includes(lang)) {
      return db.query(`update words set ${lang} = $1 where id = $2 returning *;`, [value, id]);

    }else {
      throw `${lang} is not supported`
    }
    // update words set italian = 'pasta' where id = 1;
  }


module.exports = {
  generateWord: generateWord,
  findWordById: findWordById,
  findWordByLanguage: findWordByLanguage,
  findImage: findImage,
  addImage: addImage,
  translateWord: translateWord
};


