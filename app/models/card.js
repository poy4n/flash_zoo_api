const db = require("../../db/db");

// insert a new card when a round is completed
function newCard(language, status, word_id, user_id) {
    return db.query("insert into cards (language, status, word_id, user_id) values ($1, $2, $3, $4);", [language, status, word_id, user_id]);
}

// select a user card to display - corrects only 
// take word_id and find image in word table
function selectCard(status, user_id ) {
    return db.query("select language, word_id from cards where status = $1 and user_id = $2;", [status, user_id]);
}

// update each card - this function TBC
function updateCard(language, status, word_id, user_id) {
    return db.query("update cards set status = $2 where language = $1 and word_id = $3 and user_id = $4;", [language, status, word_id, user_id]);
} 

module.exports = {
    newCard: newCard,
    selectCard: selectCard,
    updateCard: updateCard
};