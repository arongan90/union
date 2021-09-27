const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

let port = process.env.PORT || 4000;

server.listen(port, () => {
   console.info(`JSON Server is running, port(${port})`);
});


// socket
const http = require('http');
const express = require('express');
const app = express();
const chatServer = http.createServer(app);
const io = require("socket.io")(chatServer, { cors: {origin: "*"} });

let clients = {};

io.on("connection", socket => {
   clients[socket.id] = socket;

   socket.emit("connection", {type: "connected"});

   socket.on("msg", data => {
      console.info(data);

      socket.emit("recMsg", {comment: data.name + ":" + data.comment});
   });
});

chatServer.listen(5050, () => console.info(`chatServer is running, port(5050)`));

