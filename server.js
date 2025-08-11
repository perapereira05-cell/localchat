const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('🟢 Novo usuário conectado');

  socket.on('chat message', msg => {
    io.emit('chat message', msg); // envia pra todos os usuários
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuário desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
