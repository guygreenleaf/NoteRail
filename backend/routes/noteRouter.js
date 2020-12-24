const router = require('express').Router()
const auth = require('../middleware/auth')
const noteCtrl = require('../controllers/noteCtrl')

router.route('/')
    .get(auth,noteCtrl.getNotes)
    .post(auth, noteCtrl.createNote)


router.route('/:id')
    .get()
    .put()
    .delete()

module.exports = router