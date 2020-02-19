const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// require the exported routs
const usersController = require('./app/controllers/usersController');
const cardsController = require('./app/controllers/cardsController');
const wordsController = require('./app/controllers/wordsController');

const app = express();
const port = 8080;

app.use(cors());
//app.options('*', cors());  // enable pre-flight

//middleware which will parse JSON request 
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({welcome: 'flash_zoo_api'})
});

// use the controller, the order is important, that's why it's located after the '/' rout
app.use('/api', usersController);
app.use('/api', cardsController);
app.use('/api', wordsController);

app.listen(port, () => {
    console.log(`flash_zoo_api listening on ${port}`);    
})
