const express = require('express')
const router = express.Router()
const thoughtController = require('../controllers/thoughts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/createThought', ensureAuth, thoughtController.createThought)

router.get('/:id', ensureAuth, thoughtController.getThought)

router.post('/addThought', ensureAuth, thoughtController.addThought)

router.put('/updateThought', ensureAuth, thoughtController.udpateThought)

router.delete('/deleteThought', ensureAuth, thoughtController.deleteThought)

module.exports = router