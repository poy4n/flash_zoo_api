const db = require("../../db/db");


// insert new cards when the round is finished. It will insert all the cards with one request.
function newCard(data) {
    let sql = "INSERT INTO cards (language, status, word_id, user_id) VALUES";
    data.forEach(function(card, i) {
        sql += ` ($${i*card.length + 1}, $${i*card.length + 2}, $${i*card.length + 3}, $${i*card.length + 4})`
        if (data.length - 1 !== i) {
            sql += ','
        } else {
            sql += ';'
        }
    });
    return db.query(sql, data.flat());
}

// finds all cards by status, user_id and language
function selectCard(status, user_id, language ) {
    return db.query("select word_id from cards where status = $1 and user_id = $2 and language = $3;", [status, user_id, language]);
}

// // update each card - this function TBC
// function updateCard(language, status, word_id, user_id) {
//     return db.query("update cards set status = $2 where language = $1 and word_id = $3 and user_id = $4;", [language, status, word_id, user_id]);
// } 

module.exports = {
    newCard: newCard,
    selectCard: selectCard
};