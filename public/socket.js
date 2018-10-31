var socket = io();

socket.on('message', function(msg) {
  console.log(msg);
  setMessage(msg.message);
});

function sendMessage(message) {
  setMessage(message);
  socket.emit('message', { message: message });
}
