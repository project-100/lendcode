const socket = io();
const datatrack=[];
for(i=1;i<11;i++){
  document.getElementById('droplist').innerHTML+=`<a class ="dropdown-item" id=${i} onclick=track(${i}) data-toggle="modal" data-target="#myModal">data ${i}</a>`;
}

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
  
  if(data!=get){
    socket.emit("code",messages);
    get=data;
    getdata(data);
    
}

});
function getcode(){
  socket.emit("room",getroom[1]);
}
document.getElementById('text').addEventListener( "keydown", ()=>{
  var data=document.getElementById('text').value;

  var messages = {room,data}
  if(data!=get){
    socket.emit("code",messages);
    get=data;
    getdata(data);
    
}
});
function getdata(data){
  
  if(data.length==0){
    return;
  }
 while(datatrack.length>11){
 datatrack.shift();
 }

       if(datatrack.indexOf(data)==-1){
        datatrack.push(data);
        
       }
      
   
    
  
  
}
function track(i){
  if(datatrack[i-1]!=null){
  document.getElementById('showtrack').value=datatrack[i-1];
  console.log(datatrack[i-1]);
  }
  else{
    document.getElementById('showtrack').value="not tracked";
  }
  
}




