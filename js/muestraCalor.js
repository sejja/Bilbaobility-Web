var heatmapData = [];

window.initMap = initMap;
var map;
var pulsacion=0;
var origen;
var destino;

function initMap() {

    var bilbao = new google.maps.LatLng(43.2630018, -2.9350039);
    var mapOptions = {
      zoom:14,
      center: bilbao
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    muestraCalor();
  }
  
  

function muestraCalor(){
    let xhr = new XMLHttpRequest();
    let ruta="getRutasCalor.php";
    xhr.open("GET", ruta);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
        const datos = JSON.parse(xhr.responseText);
        datos.forEach(function callback(currentValue, index, array) {
            var iniciof=new google.maps.LatLng(currentValue.lat,currentValue.lon);
            heatmapData.push(iniciof);
            
        });
        mostrar();
          console.log(xhr.responseText);
       }};
    
    xhr.send();

}

function mostrar(){
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      heatmap.setMap(map);
      console.log(heatmap.get("radius"));
      heatmap.set("radius", 10);
}