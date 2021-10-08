
import express  from 'express';
import http from 'http';
import {Server } from "socket.io"
const app = express()
const port = 3000
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 300, 
  pingTimeout: 5000
})
io.on("connection", socket =>{
  socket.send("hello, socket connection established")
  console.log("connected to trhe client");
})
app.use(express.static("build"))

app.use(express.static("public"))
app.get('/', (req, res) => {
  res.send('Hello World!')
  res.sendFile("./index.html")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})