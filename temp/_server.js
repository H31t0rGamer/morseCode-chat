const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app);
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/sender", (req, res) => {
    res.sendFile(__dirname + "/sender/sender.html")
})
app.get("/sender/js", (req, res) => {
    res.sendFile(__dirname + "/sender/sender.js")
})

app.get("/reciever", (req, res) => {
    res.sendFile(__dirname + "/reciever/reciever.html")
})
app.get("/reciever/js", (req, res) => {
    res.sendFile(__dirname + "/reciever/reciever.js")
})

app.get("/", (req, res) => {
    res.send(`
        /sender?id=... ou /reciever?id=...
    `)
})




server.listen(8080, () => console.log("Running on port",8080))

const socketio = require("socket.io")(server)

socketio.on("connection", (s) => {
    s.on("sender", (data, id) => {
        s.to(id).emit("reciever", data)
    })

    s.on("enter", id => {
        s.join(id)
    })
})