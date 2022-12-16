import { } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js

var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilbability-default-rtdb.firebaseio.com"
});

const db = getFirestore(app);

window.initMap = initMap;

function initMap() {

  const citiesCol = collection(db, 'incidencias');

  console.log(citiesCol);

    var bilbao = new google.maps.LatLng(43.2630018, -2.9350039);
    var mapOptions = {
      zoom:14,
      center: bilbao
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.addListener("click", (e) => {
        var se = document.getElementById("tipoIncidencia");
        var value = se.value;
        enviarDatos(e.latLng.lat(),e.latLng.lng(),value);
        new google.maps.Marker({
            position: e.latLng,
            map: map,
        });
  });
  }
  
  function enviarDatos(lat,lon,value){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "insertincidencia.php?idUsuario=3&idTipo="+value+"&Lat="+lat+"&Lon="+lon);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.responseText);
       }};
    
    xhr.send();

}
