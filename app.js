"use strict"

if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const errorHandler = require("./middleware/errorHandler")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(errorHandler)
app.use("/", routes)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('updatePlayer', function (data) {
    // console.log(data);
    socket.emit('connectRoom', data)
    socket.broadcast.emit('connectRoom', data)
    // socket.join(data.id)
    // io.sockets.in(data.id).emit("connectRoom", data.id)
  })

  socket.on('createRoomSocket', function (data) {
    console.log(data);
    // socket.emit('connectRoomGame', data)
    // socket.broadcast.emit('connectRoomGame', data)
    socket.join(data.id)
    io.sockets.in(data.id).emit('connectRoom', data.players)
  })

  socket.on('findAllRoom', function () {
    // console.log("masuk pak eko");
    socket.emit('getRoom')
    socket.broadcast.emit('getRoom')
  })

  socket.on('getPlayerInRoom', function (data) {
    console.log(data)
    socket.emit('getPlayers', data.players)
    // socket.broadcast.emit('getPlayers', player)


    socket.join(data.id)
    io.sockets.in(data.id).emit('connectRoom', data.players)
    io.sockets.in(data.id).emit('getPlayers', data.players)
  })

  socket.on('gameStatus', function (rules, game) {
    console.log("rulse", rules);
    console.log("game", game);
    socket.emit('getStatusGame', rules, game)
    socket.broadcast.emit('getStatusGame', rules, game)
  })

  socket.on('newposition', function (newitemposition) { //kevin
    socket.emit('getnewposition', newitemposition)
    socket.broadcast.emit('getnewposition', newitemposition)
  })

  socket.on('starter', function (startposition) { //kevin
    socket.emit('startposition', startposition)
    socket.broadcast.emit('startposition', startposition)
  })

  socket.on('newscore', function (playerscore) { //kevin
    console.log(playerscore)
    socket.emit('setscore', playerscore)
    socket.broadcast.emit('setscore', playerscore)
  })
});

http.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))