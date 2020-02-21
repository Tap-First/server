"use strict"

const router = require("express").Router()
const gameController = require('../controller/gameController')

router.post('/createuser',gameController.createUser)
router.get('/rooms',gameController.roomList)
router.post('/createroom',gameController.createRoom)
router.post('/startgame',gameController.starter)
router.put('/updatescore',gameController.updateScore)
router.put('/updateplayer',gameController.updatePlayer)
router.delete('/quitgame',gameController.quit)

module.exports = router