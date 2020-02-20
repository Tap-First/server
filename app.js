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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use("/", routes)

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))