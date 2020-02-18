const fs = require('fs')
const db = require('../db/db')



let file = fs.readFileSync('animal_list.txt')

let animalArray = []

animalArray = file.toString().split('\n')


animalArray.forEach(element => {
    db.query('INSERT INTO words (english) VALUES ($1);', [element])
});


