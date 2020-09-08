const socket = io();
socket.emit('message',"hello");
var get=""
var my= window.location.href;;
 var getroom =my.split("=");
 var room=getroom[1];
socket.emit("room",getroom[1]);
socket.on("senddata",message=>{
    var data=document.getElementById('text').value;
    var messages={room,data}
    socket.emit("code",messages);
  console.log("user joined");
});

socket.on("code",message=>{
document.getElementById("text").value=message;

});
document.getElementById('text').addEventListener( "mousedown", ()=>{
  var data=document.getElementById('text').value;
  var messages = {room,data}
  console.log("mouseame");
  if(data!=get){
    socket.emit("code",messages);
    get=data;
    console.log("not same");
}

});
document.getElementById('text').addEventListener( "keypress", ()=>{
  var data=document.getElementById('text').value;
  console.log("mouseaddme");
  var messages = {room,data}
  if(data!=get){
    socket.emit("code",messages);
    get=data;
    console.log("not same");
}
});




