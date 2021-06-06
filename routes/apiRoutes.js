const router = require('express').Router();
const { v4: uuidv4 } = require('uuid'); //use in the post request
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    console.log('running');
    readFileAsync('./db/db.json', 'utf8')
    .then(notes => {
        console.log(notes);
        return res.json(JSON.parse(notes))
    });
})

router.post('/notes', (req,res) => {
    console.log(req.body);
    // set req.body to a variable

    const newNote = req.body
    newNote.id = uuidv4();
    // We need to fetch existing notes array
    readFileAsync('./db/db.json', 'utf8')
    .then(notes => {
        console.log('notes inside post route', notes);
        const parseNotes = JSON.parse(notes);
        console.log(typeof parseNotes);
        // We need to add the newNote to the existing notes array 
        parseNotes.push(newNote);
        console.log("parseNotes with new note: ", parseNotes);
        // We need to write the updated array to the db file
        // respond with the new note
        writeFileAsync('./db/db.json', JSON.stringify(parseNotes, null, 2));
    })    
    return res.send(newNote)
})

router.delete('/notes/:id', (req,res) => {
    console.log("req.params:", req.params);

    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("notesArray", JSON.parse(data));
            const notesArray = JSON.parse(data);

            const filteredArray = notesArray.filter(item => item.id != req.params.id);

            fs.writeFile("./db/db.json", JSON.stringify(filteredArray, null, 2), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(filteredArray);
                }
            })
        }
    } ) 
})

module.exports = router;