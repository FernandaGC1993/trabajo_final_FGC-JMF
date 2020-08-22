// Mandar llamar la petición de mapa de openstreetmap
var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>' });


var map = L.map('map', {
      center: [19.324487, -99.149506],
      zoom: 10,
      layers: []// estas son las capas activas
      });


var carto= L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
 subdomains: 'abcd',
 maxZoom: 19
  }).addTo(map);

  //CAPA 1 JSON: Emisiones por municipio 
var emistot = L.geoJson(emisiones, {style: style, onEachFeature: popup }).addTo(map);
  
  // POPUP DE EMISIONES
        //ESTILOS PARA HOTELES
        function style(feature) { 
            return { 
            fillColor: 'blue', 
            weight: 1, 
            opacity: 1.5, 
            color: 'white', 
            fillOpacity: .60
            }; 
        }
      function popup(feature, layer) { 
        if (feature.properties && feature.properties.DEL_MUN) 
        { 
        layer.bindPopup('Municipio: '+feature.properties.DEL_MUN+'</br></br><div style=""><strong>Emisiones por municipio</strong></div>'+
          '<table class="table-striped table-bordered">'+
            '<tr>'+
              '<th>PM10</th>'+
              '<th>PM25</th>'+
              '<th>NOX</th>'+
              '<th>COV</th>'+
            '</tr>'+
            '<tr>'+
               '<td>'+feature.properties.PM10+'</td>'+
               '<td>'+feature.properties.PM25+'</td>'+
               '<td>'+feature.properties.NOX+'</td>'+
               '<td>'+feature.properties.COV+'</td>'+
            '</tr>'+
          '</table>'); 
        } 
      };
  // FIN DE CAPA DE EMISIONES TOTALES

//CAPA 2 JSON: Autocorelación COV
var cov1 = L.geoJson(emisiones, {style: cov});


//ESTILOS PARA COV
function cov(feature) { 
      return { 
      fillColor: getColor(feature.properties.quad_COV, feature.properties.sig_COV), 
      weight: 1, 
      opacity: 1.5, 
      color: 'white', 
      fillOpacity: .60
      }; 
}

//COLORES PARA COV
function getColor(d,c) {
  return  d == 1 && c == true ? '#FF6347' : 
          d == 3 && c == true ? '#B0E0E6' : 
          '#FFFFFF'; 
          };

//FIN COV

//CAPA 3 JSON: Autocorelación PM10
var pmdiez = L.geoJson(emisiones, {style: pm10});


//ESTILOS PARA PM10
function pm10(feature) { 
      return { 
      fillColor: getColor(feature.properties.quad_PM10, feature.properties.sig_PM10), 
      weight: 1, 
      opacity: 1.5, 
      color: 'white', 
      fillOpacity: .60
      }; 
}

//COLORES PARA PM10
function getColor(d,c) {
  return  d == 1 && c == true ? '#FF6347' : 
          d == 3 && c == true ? '#B0E0E6' : 
          '#FFFFFF'; 
          };

//FIN PM10

//CAPA 4 JSON: Autocorelación PM25
var pmdos = L.geoJson(emisiones, {style: pm25});


//ESTILOS PARA PM25
function pm25(feature) { 
      return { 
      fillColor: getColor(feature.properties.quad_PM25, feature.properties.sig_PM25), 
      weight: 1, 
      opacity: 1.5, 
      color: 'white', 
      fillOpacity: .60
      }; 
}

//COLORES PARA PM25
function getColor(d,c) {
  return  d == 1 && c == true ? '#FF6347' : 
          d == 3 && c == true ? '#B0E0E6' : 
          '#FFFFFF'; 
          };

//FIN PM25

//CAPA 4 JSON: Autocorelación NOX
var nox1 = L.geoJson(emisiones, {style: nox});


//ESTILOS PARA PM25
function nox(feature) { 
      return { 
      fillColor: getColor(feature.properties.quad_NOX, feature.properties.sig_NOX), 
      weight: 1, 
      opacity: 1.5, 
      color: 'white', 
      fillOpacity: .60
      }; 
}

//COLORES PARA NOX
function getColor(d,c) {
  return  d == 1 && c == true ? '#FF6347' : 
          d == 3 && c == true ? '#B0E0E6' : 
          '#FFFFFF'; 
          };

//FIN NOX

var baseMaps = {
      "Mapa base OSM": OSM,
      "Carto": carto
    };
  
var overlay = {
  "Emisiones por municipio": emistot,
  "Hotspots COV": cov1, 
  "Hotspots PM10": pmdiez,
  "Hotspots PM2.5": pmdos,
  "Hotspots NOX": nox1,  
  };
  
L.control.layers(baseMaps, overlay).addTo(map);