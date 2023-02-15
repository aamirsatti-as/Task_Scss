var express = require('express');
var router = express.Router();
const control = require('../controller/notesController.js')
const authenticate = require('../middleware/authenticate')
router.post('/login',control.login)
router.post('/addNotes',authenticate,control.AddNote)
router.get('/viewNotes',authenticate,control.ViewNotes)
router.delete('/deleteNotes/:id', authenticate,control.deleteNotes);
router.put('/updateNotes/:id',authenticate, control.updateNotes);
module.exports = router;