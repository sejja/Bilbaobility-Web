window.initMap = initMap;
var directionsService;
var directionsRenderer;
var map;
var pulsacion=0;
var origen;
var destino;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var bilbao = new google.maps.LatLng(43.2630018, -2.9350039);
    var mapOptions = {
      zoom:14,
      center: bilbao
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
    map.addListener("click", (e) => {
      if(pulsacion==0){
        origen=e.latLng;
        pulsacion=1;
      }else{
        destino=e.latLng;
        pulsacion=0;
        enviarDatos(origen.lat(),origen.lng(),destino.lat(),destino.lng());
        calcRoute(origen,destino);
      }
  });
  }
  
  function calcRoute(start,end) {
   // var start =  new google.maps.LatLng(43.2630018, -2.9350039);
   // var end =  new google.maps.LatLng(43.259832977952826,-2.92970508307405);
    var request = {
      origin:start,
      destination:end,
      travelMode: 'WALKING'
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        muestraMarker(response);
        directionsRenderer.setDirections(response);
      }
    });
  }

  function muestraMarker(directionResult){
    var myRoute = directionResult.routes[0].legs[0];
    var marker = new google.maps.Marker({
      position: myRoute.steps[0].start_point,
      map: map
    });
    for (var i = 0; i < myRoute.steps.length; i++) {
        interpola(myRoute.steps[i].start_point,myRoute.steps[i].end_point);
        var marker = new google.maps.Marker({
          position: myRoute.steps[i].start_point,
          map: map
        });
        //markerArray[i] = marker;
    }
  }
  
  function interpola(datoa,datob){
    var lata=datoa.lat();
    var latb=datob.lat();
    var lona=datoa.lng();
    var lonb=datob.lng();
    var dist=calculateDis(lata,latb,lona,lonb);
    var npoint=Math.floor(dist/10);
    var deltaLat =latb-lata;
    var deltaLon =lonb-lona;
    var incLat=deltaLat/npoint;
    var incLon=deltaLon/npoint;
    for  (var i=0; i<npoint;i++){
      var newLat=lata+incLat*i;
      var newLon=lona+incLon*i;
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(newLat, newLon),
        map: map
      });
      enviarPunto(newLat, newLon);
    }

  }

  function calculateDis(lat1,lat2,lon1,lon2){
     R = 6371e3; // metres
    phi1 = lat1 * Math.PI/180; // φ, λ in radians
    phi2 = lat2 * Math.PI/180;
 incphi = (lat2-lat1) * Math.PI/180;
 incdelta = (lon2-lon1) * Math.PI/180;

 a = Math.sin(incphi/2) * Math.sin(incphi/2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(incdelta/2) * Math.sin(incdelta/2);
 c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

 d = R * c; // in metres
 return d;
  }

  function enviarDatos(latOrigen,lonOrigen,latDestino,lonDestino){
    let xhr = new XMLHttpRequest();
    let ruta="insertRuta.php?idUsuario=3&LatOrigen="+latOrigen+"&LonOrigen="+lonOrigen+"&LatDestino="+latDestino+"&LonDestino="+lonDestino;
    xhr.open("GET", ruta);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.responseText);
       }};
    
    xhr.send();

}

function enviarPunto(latOrigen,lonOrigen){
  let xhr = new XMLHttpRequest();
  let ruta="insertPunto.php?idUsuario=3&Lat="+latOrigen+"&Lon="+lonOrigen;
  xhr.open("GET", ruta);
  
  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        console.log(xhr.responseText);
     }};
  
  xhr.send();

}