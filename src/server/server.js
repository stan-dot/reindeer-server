import { logOutput } from './runScript.js';
import run from './runScript.js';
import express from 'express';
import http from 'http';
import { Server } from "socket.io"
// https://openmoji.org/library/#search=deer&emoji=1F98C deer emoji source
console.log("starting the app");
const app = express()
const port = 3000
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 300,
  pingTimeout: 5000
})
io.on("connection", socket => {
  socket.send("hello, socket connection established")
  console.log("connected to trhe client");
})
console.log("that's the io: ", io);
io.on("query", data => {
  (async () => {
    try {
      const output = await run(data)
      logOutput('main')(output.message)
      process.exit(0)
    } catch (e) {
      console.error('Error during script execution ', e.stack);
      process.exit(1);
    }
  })();
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