//jshint esversion:6
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(express.json());
app.get('/getlogin', function (request, response) {
  const {type,imei}=request.body
  if(type&&imei)
  {

    response.send("received login");
  }
  else {

      response.send("error");

  }
}
);
app.get('/alarm', function (request, response) {
  const {type,alarm_type,alarm_time,latitude,longitude,file_list}=request.body
  if(type&&alarm_type&&alarm_time&&latitude&&longitude&&file_list)
  {
  response.send("alarm received");
  }
  else {

      response.send("error");

}
}
);
app.get('/location', function (request, response) {
  const{type,location_time,latitude,longitude}=request.body
  if(type&&location_time&&latitude&&longitude)
  {
    response.send("location received");
  }
  else
    {
      response.send("error");
    }
}
);
app.get('/video', function (request, response) {
  const{imei,filename,data}=request.body
  if(imei&&filename&&data)
  {
    response.send("video received");
  }
  else
    {
      response.send("error");
    }

}
);
var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
  socket.on('new_message', (data) => {
    var New_Details = {
        type: data.type,
        imei: data.imei,
        command: data.command
    };

    socket.broadcast.emit('update_message', New_Details);
    console.log(data.imei + ' just wrote ' + data.command);
});
});

server.listen(1337, '127.0.0.1');

app.post('/command',function(request,response){
  response.send("abc");
});
app.listen(3000,function()
{
  console.log("Server");
});
