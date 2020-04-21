//casos de los eventos
const PROXIMITY_EVENT = 0;
const TOUCH_EVENT = 1;
const CAR_DISTURBANCE_EVENT = 2;
const INTRUDER_EVENT = 3;
const GPS_EVENT = 4;
const HIT = 5;

//creamos una referencia a la base de datos para enviar el valor de la pagina en que nos encontramos
var touchIsStartedDB = firebase.database().ref("/").child("touchIsStarted");
var accelerometerXDB = firebase.database().ref("/").child("accelerometerX");
var accelerometerZDB = firebase.database().ref("/").child("accelerometerZ");
var lightDB          = firebase.database().ref("/").child("light");
var proximityDB      = firebase.database().ref("/").child("proximity");
var latitudeDB       = firebase.database().ref("/").child("latitude");
var longitudeDB      = firebase.database().ref("/").child("longitude");
var altitudeDB       = firebase.database().ref("/").child("altitude");

//variables a usar para los datos de la DB
var touchIsStarted; 
var accelerometerX; 
var accelerometerZ; 
var light;          
var proximity;      
var latitude;       
var longitude;      
var altitude;

// llamamos los valores cada vez que un cambio existe en la base de datos
touchIsStartedDB.on('value', function(snap){
  touchIsStarted = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

accelerometerXDB.on('value', function(snap){
  accelerometerX = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

accelerometerZDB.on('value', function(snap){
  accelerometerZ = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

lightDB.on('value', function(snap){
  light = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

proximityDB.on('value', function(snap){
  proximity = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

latitudeDB.on('value', function(snap){
  latitude = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

longitudeDB.on('value', function(snap){
  longitude = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

altitudeDB.on('value', function(snap){
  altitude = snap.val(); // usar los valores en la funcion
  cambiarStatus();
});

var eventInTheCar = (event) => {
  if (event < 0 || event > 5) return;
  var msgAlerta;
  var msgImagen;
  var alerta = document.getElementById("alerta");
  var imagen = document.getElementById("imagen");
  switch(event) { 
  case PROXIMITY_EVENT:
    msgAlerta = "Posible intruso husmeando";
    msgImagen = "img/AutoIntrusoHusmeando.jpg";
    break;
  case TOUCH_EVENT:
    msgAlerta = "Alguien intenta abrir o a roto los cristales";
    msgImagen = "img/AutoCristalesRotos.jpg";
    break;
  case CAR_DISTURBANCE_EVENT:
    msgAlerta = "Probable impacto o robo de autopartes externas";
    msgImagen = "img/AutoRoboAutopartes.jpg";
    break;
  case INTRUDER_EVENT:
    msgAlerta = "intruso en el auto";
    msgImagen = "img/AutoIntrusoEnAuto.jpg";
    break;
  case GPS_EVENT:
    msgAlerta = "El automovil esta en movimiento. Posible robo";
    msgImagen = "img/AutoEnMovimiento.jpg";
    break;
  case HIT:
    msgAlerta = "Golpe por alcance";
    msgImagen = "img/AutoGolpePorAlcance.jpg";
    break;
  default:
    msgImagen = "img/AutoSeguro.jpg";
    msgAlerta = "ninguno"
  }
  alerta.innerHTML = msgAlerta;
  imagen.src = msgImagen;
}

var cambiarStatus = () => {
  if (touchIsStarted == "true") {
    eventInTheCar(TOUCH_EVENT);
  }else if (latitude != 0 && longitude != 0 && altitude!=0 && accelerometerX > 3.00 && accelerometerZ > 2.00) {
    eventInTheCar(GPS_EVENT);
  }else if (accelerometerX > 3.00 && accelerometerZ > 2.00) {
    eventInTheCar(CAR_DISTURBANCE_EVENT);
  }else if (light > 80.0) {
    eventInTheCar(INTRUDER_EVENT);
  }else if (proximity == 0) {
    eventInTheCar(PROXIMITY_EVENT);
  }
}