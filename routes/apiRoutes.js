const router = require('express').Router();
const { v4: uuidv4 } = require('uuid'); //use in the post request
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    console.log('running');
    readFileAsync('../note-taker/db/db.json', 'utf8')
    .then(note => {
        console.log(note);
        return res.json(JSON.parse(note))
    });
})

//router.post 
//req.body.id = uuidv4();

//router.delete

module.exports = router;