<<<<<<< HEAD
const { Room, User } = require('../models')
=======
const { Room } = require('../models')
const createError = require("http-errors")
>>>>>>>         modified:   app.js => panggil errorhandler

class RoomController {
  // additional
  // static starter2 (req,res,next) {
  //   let data = []
  //   while(data.length !== 3) {
  //     let number = this.random()
  //     const duplicate = data.find(element => element == number)
  //     if(duplicate == undefined) {
  //       data.push(number)
  //     }
  //   }
  //   return data
  // }

  static createUser(req, res, next) {
    let obj = {
      name: req.body.name
    }
    User.findOne({
      where: obj
    })
      .then(avail => {
        if (avail == null) {
          return User.create(obj)
        } else {
          throw {
            status: 400,
            message: `name has been used`
          }
        }
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        next(error)
      })
  }

  static starter(req, res, next) {
    Room.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(room => {
        if (room.dataValues.players.length == 1) {
          throw {
            status: 400,
            message: `min 2 players to start`
          }
        } else {
          let position = RoomController.random()
          req.io.emit('update', { message: 'starter' })
          res.status(200).json({ position, id: req.body.id })
        }
      })
      .catch(error => {
        next(error)
      })
  }

  static random(req, res, next) {
    return Math.ceil(Math.random() * 9)
  }

  static roomList(req, res, next) {
    Room.findAll()
      .then(rooms => {
        // console.log(req.io.emit);
        req.io.emit('update', { message: 'room list' })
        res.status(201).json({ rooms, id: req.body.id })
      })
      .catch(error => {
        next(error)
      })
  }

  static updateScore(req, res, next) {
    let playerData
    Room.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(room => {
        let updatedRoom = [...room.dataValues.players]
        for (let i = 0; i < updatedRoom.length; i++) {
          if (updatedRoom[i].name == req.body.name) {
            updatedRoom[i].score += 1
            break;
          }
        }
        let obj = {
          players: updatedRoom
        }
        playerData = updatedRoom
        return Room.update(obj, {
          where: {
            id: req.body.id
          }
        })
      })
      .then(updated => {
        let position = RoomController.random()
        req.io.emit('update', { message: 'score updated' })
        res.status(200).json({ position, players: playerData, id: req.body.id })
      })
      .catch(next)
  }

  static updatePlayer(req, res, next) {
    let playerData
    // console.log(req.body);
    Room.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(room => {
        let updatedRoom = [...room.dataValues.players]
        updatedRoom.push({
          name: req.body.name,
          score: 0
        })
        let obj = {
          players: updatedRoom
        }
        playerData = updatedRoom
        return Room.update(obj, {
          where: {
            id: req.body.id
          }
        })
      })
      .then(updated => {
        // console.log(req.io);
        req.io.emit('update', { message: 'player inserted' })
        res.status(200).json({ players: playerData, id: req.body.id })
      })
      .catch(next)
  }

  static createRoom(req, res, next) {
    let { roomName, playerName } = req.body
    if (roomName.length > 10) {
<<<<<<< HEAD
      throw {
        status: 400,
        message: 'room name max length is 10'
      }
    } else {
      Room.create({
        name: roomName,
        players: [
          {
            name: playerName,
            score: 0
          }
        ]
      })
        .then(created => {
          return Room.findAll({
            order: [
              ['updatedAt', 'DESC'],
            ],
          })
        })
        .then(rooms => {
          req.io.emit('update', { message: 'room created' })
          res.status(201).json({ rooms, id: req.body.id })
        })
        .catch(error => {
          next(error)
        })
=======
      next(createError(400, { message: "room name max length 10" }))
>>>>>>>         modified:   app.js => panggil errorhandler
    }
    Room.create({
      name: roomName,
      players: [
        {
          name: playerName,
          score: 0
        }
      ]
    })
      .then(created => {
        return Room.findAll()
      })
      .then(rooms => {
        req.io.emit('update', { message: 'room created' })
        res.status(201).json({ rooms, id: req.body.id })
      })
      .catch(next)
  }

  static quit(req, res, next) {
    let { name } = req.body
    User.destroy({
      where: {
        name: name
      }
    })
      .then(deleteUser => {
        return Room.findOne({
          where: {
            id: req.body.id
          }
        })
      })
      .then(room => {
        if (room.players.length == 1) {
          return Room.destroy({
            where: {
              id: req.body.id
            }
          })
        } else {
          let updatedRoom = [...room.dataValues.players]
          for (let i = 0; i < updatedRoom.length; i++) {
            if (updatedRoom[i].name == name) {
              updatedRoom.splice(i, 1)
              break;
            }
          }
          let obj = {
            players: updatedRoom
          }
          return Room.update(obj, {
            where: {
              id: req.body.id
            }
          })
        }
      })
      .then(result => {
        return Room.findAll()
      })
      .then(rooms => {
        req.io.emit('update', { message: 'room updated' })
        res.status(200).json({ rooms, id: req.body.id })
      })
      .catch(next)
  }
}

module.exports = RoomController