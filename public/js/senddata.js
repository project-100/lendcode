const socket = io();
const datatrack = [];
for (i = 1; i < 11; i++) {
  document.getElementById(
    'droplist'
  ).innerHTML += `<a class ="dropdown-item" id=${i} onclick=track(${i}) data-toggle="modal" data-target="#myModal">data ${i}</a>`;
  document.getElementById(i).style.display="none";
}

socket.emit('message', 'hello');
var get = '';
var my = window.location.href;
var getroom = my.split('?');

var room = getroom[1];
socket.emit('room', getroom[1]);
socket.on('senddata', (message) => {
  var data = document.getElementById('text').value;
  var messages = { room, data };
  socket.emit('code', messages);
  console.log('user joined');
});

socket.on('code', (message) => {
  document.getElementById('text').value = message;
});
document.getElementById('text').addEventListener('mousedown', () => {
  var data = document.getElementById('text').value;
  var messages = { room, data };

  if (data != get) {
    socket.emit('code', messages);
    get = data;
    
  }
});
function getcode() {
  socket.emit('room', getroom[1]);
}
document.getElementById('text').addEventListener('keydown', () => {
  var data = document.getElementById('text').value;

  var messages = { room, data };
  if (data != get) {
    socket.emit('code', messages);
    get = data;
   
  }
});
var Trackrate=60000;

var TrackInterval=function(s){
  
 if(s=="start")
  {
   var SetInterval=  setInterval(function(){
      var data = document.getElementById('text').value;
      getdata(data);
      console.log("yess");
    },Trackrate);
    console.log(Trackrate);
  }
    if(s=="stop"){
      clearInterval(SetInterval);
    }




}
TrackInterval("start");

document.getElementById('Trackrate').addEventListener('change',()=>{
  Trackrate=document.getElementById('Trackrate').value;
  if(Trackrate==0){
        Trackrate=60;
        document.getElementById('Trackrate').value=60;
  }
  Trackrate=Trackrate*1000;
  
  TrackInterval("stop");
  TrackInterval("start");
  
  console.log(Trackrate);
});

function getdata(data) {
  if (data.trim().length == 0) {
    return;
  }
  while (datatrack.length > 11) {
    datatrack.shift();
  }

  if (datatrack.indexOf(data) == -1) {
    datatrack.push(data);
    var time=new Date();
    var Tracker=document.getElementById(datatrack.length);
    Tracker.style.display="";
    Tracker.innerHTML="tracked at "+time.toLocaleTimeString();


  }
}
function track(i) {
  if (datatrack[i - 1] != null) {
    document.getElementById('showtrack').value = datatrack[i - 1];
    console.log(datatrack[i - 1]);
  } else {
    document.getElementById('showtrack').value = 'not tracked';
  }
}
