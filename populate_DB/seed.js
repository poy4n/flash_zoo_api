const fs = require('fs')
const db = require('../db/db')



let file = fs.readFileSync('animal_list.txt')

animal_array = []

animal_array = file.toString().split('\n')
// console.log(animal_array)


animal_array.forEach(element => {
    db.query('INSERT INTO words (english) VALUES ($1);', [element])
});


