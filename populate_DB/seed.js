const fs = require('fs')
const db = require('../db/db')



let file = fs.readFileSync('./populate_DB/animal_list.txt')

let animalArray = []

animalArray = file.toString().split('\n')
console.log(animalArray)

animalArray.forEach(element => {
    db.query('INSERT INTO words (english) VALUES ($1);', [element])
});


