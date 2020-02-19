// mini router
const express = require('express'); 

const router = express.Router();
const User = require('../models/user');

// find user by email
router.get('/user/email', (req, res) => {
        
    User
        .findByEmail(req.body.email)
        .then(query_res => res.json({user: query_res.rows}))
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        );
});

// find user by id
router.get('/user/id', (req, res) => {
        
    User
        .findById(req.body.id)
        .then(query_res => res.json({user: query_res.rows}))
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        );
});

// create user
router.post('/user', (req, res) => {
    User
        .findByEmail(req.body.email)
        .then(query_find_res => {
            if(query_find_res.rows.length > 0) {
                return res.json({user: query_find_res.rows})
            } else {
                User
                    .createUser(req.body.email)
                    .then(query_create_res => res.json({user: query_create_res.rows}))
                    .catch(err =>
                        setImmediate(() => {
                            throw err
                        })
                    );
            }
        })
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        );
});

module.exports = router;