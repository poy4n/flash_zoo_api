const db = require("../../db/db");

// max num of 7 - select random words
function selectWord(foreignLang, randomNum) {
  return db.query("select id, english, $1, image_url from words order by random() limit $2;"[foreignLang, randomNum]);
}

// find an image to display already selected in card
function findImage(id) {
  return db.query("select image_url from words where id = $1;", [id]);
}

// add / update image from api
function addImage(image_url, english, id) {
  return db.query("update words set image_url = $1 where english = $2 and id = $3;", [image_url, english, id]);
}         

// insert more languages into db
function translateWord(german, french, italian, english, id) {
  return db.query("update words set (german, french, italian) = ($1, $2, $3) where english = $4 and id = $5;", [german, french, italian, english, id]);
}

module.exports = {
  selectWord: selectWord,
  findImage: findImage,
  addImage: addImage,
  translateWord: translateWord
};