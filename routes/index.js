"use strict"

const router = require("express").Router()
const gameController = require('../controller/gameController')

router.post('/createroom',gameController.createRoom)
router.post('/startgame',gameController.starter)
router.post('/updatescore',gameController.updateScore)
router.post('/updateplayer',gameController.updatePlayer)
router.post('/quitgame',gameController.quit)

module.exports = router