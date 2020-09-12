const socket = io();
const datatrack = [];
socket.emit('message', 'hello');
var get = '';
var my = window.location.href;
var getroom = my.split('?');
for (i = 1; i < 11; i++) {
  document.getElementById(
    'droplist'
  ).innerHTML += `<a class ="dropdown-item" id=${i} onclick=track(${i}) data-toggle="modal" data-target="#myModal">data ${i}</a>`;
  document.getElementById(i).style.display = 'none';
}
var room = getroom[1];
getcode();
socket.on('senddata', (message) => {
 datarequest();
 
});
document.getElementById('text').addEventListener("keyup", () => {
  DataSend();
});
var Trackrate = 10000; // 10 seconds

socket.on('code', (message) => {
  document.getElementById('text').value = message;
});
document.getElementById('text').addEventListener("paste", () => {
  setTimeout(()=>{
    DataSend();
    console.log("paste");
  },3000);
 
 
 });

function datarequest(){
  var data = document.getElementById('text').value;
  var messages = { room, data };
  socket.emit('code', messages);
  console.log('user joined');
}


function DataSend(){
  var data = document.getElementById('text').value;
  var messages = { room, data };

  if (data != get) {
    socket.emit('code', messages);
    get = data;
  }
}

function getcode() {
  socket.emit('room', getroom[1]);
}


function TrackInterval(s) {
  if (s == true) {
    var SetInterval = setInterval(function () {
      var data = document.getElementById('text').value;
      getdata(data);
      console.log('yess');
    }, Trackrate);
    console.log(Trackrate);
  }
  if (s == false) {
    clearInterval(SetInterval);
  }
};
TrackInterval(true);
function dataTrack(){
  Trackrate = document.getElementById('Trackrate').value;
  if (Trackrate == 0) {
    Trackrate = 10;
    document.getElementById('Trackrate').value = 10;
  }
  Trackrate = Trackrate * 1000;

  TrackInterval(false);
  TrackInterval(true);

}


document.getElementById('Trackrate').addEventListener('change', () => {
 
dataTrack();
 
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
    var time = new Date();
    var Tracker = document.getElementById(datatrack.length);
    Tracker.style.display = '';
    Tracker.innerHTML = 'tracked at ' + time.toLocaleTimeString();
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
