const router = require('express').Router()
const auth = require('../middleware/auth')
const noteCtrl = require('../controllers/noteCtrl')

router.route('/')
    .get(auth, noteCtrl.getNotes)
    .post(auth, noteCtrl.createNote)
    
router.route('/public')
    .get(auth, noteCtrl.getAllNotes)

// router.route('/updateVisibility')
//     .put(auth, noteCtrl.updateVisibility)
// router.post('/notes/createNote', auth, noteCtrl.createNote)
// router.get('/notes/getNote', auth, noteCtrl.getNotes)

router.route('/:id')
    .get(auth, noteCtrl.getNote)
    .put(auth, noteCtrl.updateNote)
    .delete(auth, noteCtrl.deleteNote)

module.exports = router