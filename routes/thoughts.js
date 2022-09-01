const express = require('express')
const router = express.Router()
const thoughtController = require('../controllers/thoughts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, thoughtController.getThoughts)

router.post('/createThought', ensureAuth, thoughtController.createThought)

router.put('/updateThought', ensureAuth, thoughtController.udpateThought)

router.delete('/deleteThought', ensureAuth, thoughtController.deleteThought)

module.exports = router