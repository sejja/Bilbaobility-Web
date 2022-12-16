import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getFirestore, collection, getDocs,
    doc, setDoc, addDoc, onSnapshot, query, where, 
    limit } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

    const firebaseConfig = {
        apiKey: "AIzaSyDhbECtGiXEW58aYO3yTMfVvGrCwOah5qE",
        authDomain: "bilbability.firebaseapp.com",
        databaseURL: "https://bilbability-default-rtdb.firebaseio.com",
        projectId: "bilbability",
        storageBucket: "bilbability.appspot.com",
        messagingSenderId: "521585765483",
        appId: "1:521585765483:web:85e0d32db09dd7c8cad52e",
        measurementId: "G-CLML7K6JPH"
      };
    
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

let clustersOrdenados;
// Initialize and add the map
function initMap() {

    // The location of Uluru
    // The map, centered at Uluru

    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uluru,
    });
    var mapDiv = document.getElementById('map');
    mapDiv.map = map;
    //map.addListener("click", (e) => {
    //    placeMarkerAndPanTo(e.latLng, map);
    //    vector.push([e.latLng.lat(), e.latLng.lng()]);
    //    enviarDatos(e.latLng.lat(),e.latLng.lng());
    // });

    let map2 = new google.maps.Map(document.getElementById('map2'), {
        center: uluru,
        zoom: 15,
        mapTypeId: 'satellite'
    });
    var mapDiv2 = document.getElementById('map2');
    mapDiv2.map2 = map2;

    let map3 = new google.maps.Map(document.getElementById('map3'), {
        center: uluru,
        zoom: 15,
        mapTypeId: 'satellite'
    });
    var mapDiv3 = document.getElementById('map3');
    mapDiv3.map3 = map3;
    // placeMarkerAndPanTo(uluru, map2);
    mostrarDatosIncidencia();
    muestraCalor();

}

function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
        position: latLng,
        map: map,
    });
    map.panTo(latLng);
}

function plotHeatMap() {

    var heatmapData = [];

    vector.forEach(function callback(currentValue, index, array) {
        heatmapData[index] = new google.maps.LatLng(currentValue[0], currentValue[1]);
    });



    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    var mapDiv2 = document.getElementById('map2');
    let mapa2 = mapDiv2.map2;
    heatmap.setMap(mapa2);
    heatmap.set("radius", 20);
}

let vector = [];
const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
const uluru = { lat: 43.2630018, lng: -2.9350039 };


window.initMap = initMap;

function myFunctionClasifica() {
    plotHeatMap();
    longitud = vector.length;
    k = Math.ceil(Math.sqrt(longitud) / 2)
    let result = kmeans(vector, k);
    clustersOrdenados = ordenaCluster(result.clusters);
    let mapa = document.getElementById("map2").map2;
    let mapa3 = document.getElementById("map3").map3;
    clustersOrdenados.forEach(function callback(currentValue, index, array) {
        latitud = currentValue.centroid[0];
        longitud = currentValue.centroid[1];
        marker = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            map: mapa,
            label: `${index + 1}`,
            zIndex: 9999,
        });
        /* marker = new google.maps.Marker({
             position: { lat: latitud, lng: longitud },
             map: mapa3,
             label: `${index + 1}`,
             zIndex: 9999,
         });*/
    });
    muestraTabla();
    // console.log(result);
}

function ordenaCluster(cluster) {

    cluster.forEach(function callback(currentValue, index, array) {
        array[index].longitud = array[index].points.length;

    });
    cluster.sort((a, b) => (a.longitud > b.longitud) ? -1 : 1)

    return cluster;
}

function enviarDatos(lat, lon) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "insertincidencia.php?idUsuario=3&idTipo=5&Lat=" + lat + "&Lon=" + lon);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            
        }
    };

    xhr.send();

}

function mostrarDatosIncidencia() {
    const queryIncidencias = query(
        collection(db, 'incidencias')
    );
    
    onSnapshot(queryIncidencias, (querySnapshot) => {
        querySnapshot.forEach((snap) => {
            const data = snap.data();

            var iniciof = new google.maps.LatLng(data.ubicacion.latitude, data.ubicacion.longitude);
            vector.push([data.ubicacion.latitude, data.ubicacion.longitude]);
            let mapa = document.getElementById("map").map;
            new google.maps.Marker({
                position: iniciof,
                map: mapa,
            });
        });
    });


    let xhr = new XMLHttpRequest();
    let ruta = "getIncidencias.php";
    xhr.open("GET", ruta);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const datos = JSON.parse(xhr.responseText);
            datos.forEach(function callback(currentValue, index, array) {
                var iniciof = new google.maps.LatLng(currentValue.Lat, currentValue.Lon);
                vector.push([currentValue.Lat, currentValue.Lon]);
                let mapa = document.getElementById("map").map;
                new google.maps.Marker({
                    position: iniciof,
                    map: mapa,
                });
            });
            myFunctionClasifica();
           
        }
    };

    xhr.send();
}


function muestraCalor() {
    let xhr = new XMLHttpRequest();
    let ruta = "getRutasCalor.php";
    xhr.open("GET", ruta);
    var heatmapData2 = [];
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const datos = JSON.parse(xhr.responseText);
            datos.forEach(function callback(currentValue, index, array) {
                var iniciof = new google.maps.LatLng(currentValue.lat, currentValue.lon);
                heatmapData2.push(iniciof);

            });
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData2
            });
            let mapa3 = document.getElementById("map3").map3;
            heatmap.setMap(mapa3);
         
            heatmap.set("radius", 10);
            
        }
    };

    xhr.send();

}

function muestraTabla() {
    var myTableDiv = document.getElementById("myDynamicTable");
    myTableDiv.setAttribute("class","table-container")

    var table = document.createElement('TABLE');
    table.border = '1';
    table.setAttribute("class","w3-table w3-bordered");

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var tr = document.createElement('TR');
   
    tr.setAttribute("class"," w3-red");
    tableBody.appendChild(tr);

    var td = document.createElement('TH');
    td.width = '200';
    td.appendChild(document.createTextNode("Número Cluster"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    td.width = '200';
    td.appendChild(document.createTextNode("Número Incidencias"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    td.width = '200';
    td.appendChild(document.createTextNode("Latitud"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    td.width = '200';
    td.appendChild(document.createTextNode("Longitud"));
    tr.appendChild(td);

    var td = document.createElement('TH');
    td.width = '200';
    td.appendChild(document.createTextNode("Dirección"));
    tr.appendChild(td);

    for (var i = 0; i < clustersOrdenados.length; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);


        var td = document.createElement('TD');
        td.width = '200';
        td.appendChild(document.createTextNode(i + 1));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '200';
        td.appendChild(document.createTextNode(clustersOrdenados[i].longitud));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '200';
        td.appendChild(document.createTextNode(clustersOrdenados[i].centroid[0]));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.width = '200';
        td.appendChild(document.createTextNode(clustersOrdenados[i].centroid[1]));
        tr.appendChild(td);


        var td = document.createElement('TD');
        td.setAttribute("id", "campo" + i);
        td.width = '200';
        td.appendChild(document.createTextNode(""));
        tr.appendChild(td);



    }
    myTableDiv.appendChild(table);
    calculaDirección();
}
var indice = 0;

function calculaDirección() {
    if (indice < clustersOrdenados.length) {
        const geocoder = new google.maps.Geocoder();
        const latlng = {
            lat: clustersOrdenados[indice].centroid[0],
            lng: clustersOrdenados[indice].centroid[1],
        };

        geocoder.geocode({ location: latlng }).then((response) => {
            if (response.results[0]) {
                var fieldNameElement = document.getElementById("campo" + indice);
                fieldNameElement.innerHTML=response.results[0].formatted_address;
                indice++;
                calculaDirección() 

            }
        });
    }
}