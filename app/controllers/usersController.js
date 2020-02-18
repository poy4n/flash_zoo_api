// mini router
const express = require('express)'); 

const router = express.Router();
const User = require('../models/user');


router.get('/users', (req, res) => {
    User
        .allUsers()
        .then(query_res => res.json({user: query_res.rows}))
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        );
});

// router.post('/bookmarks', (req, res) => {
//     //req.query - data was send via query-strings
//     //req.params - data was send via pretty urls
//     // req.body - data was send via form data or urlencoded
//     console.log(req.body);
//     Bookmark
//         .create()
//         .then(query_res => {
//             res.json({ results: query_res.rows});
//         });
// });

module.exports = router;