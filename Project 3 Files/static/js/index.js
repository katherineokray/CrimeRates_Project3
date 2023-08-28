d3.json('/offense').then(data => {
  console.log(data)
    let trace1 = {
        x : data.map(row => row[0]),
        y : data.map(row => row[1]),
        type: "bar"
      }
        let data2 = [trace1]
        // Pass metric to chart title
        let layout = {
          title: `Criminal Data During Covid Times`
        };
        Plotly.newPlot("map", data2, layout);

        d3.selectAll("#dropdown").on("change", updateData)
        

})
function updateData(){
  d3.json('/update').then(data)
  console.log(data)
  let trace1 = {
    x : data.map(row => row[0]),
    y : data.map(row => row[1]),
    type: "bar"
  }
    let data2 = [trace1]
    // Pass metric to chart title
    let layout = {
      title: `Criminal Data During Covid Times`
    };
    Plotly.newPlot("map", data2, layout);
}

d3.json('/heatMap').then(data=> {
    console.log(data)
    let heatArray = [];
    let markerLength = 1000;

    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);


    let myMap = L.map("heatMap", {
      center: [30.2672, -97.7431],
              zoom: 10
          });
    for (let i = 0; i < markerLength; i++) {
        loc = data[i]
        console.log(loc)
        lat = loc[1]
        long = loc[2]
        heatArray.push([lat, long]);
        L.marker([lat,long], {icon: greenIcon}).addTo(myMap)
        // choosecolor(loc[0])
        console.log(L);
    
    }
    // function choosecolor(crime){
    //   if(crime = "BURGLARY OF VEHICLE"){
    //     let color = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
    //   } else if (crime = "THEFT"){
    //     color= 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-purple.png'
    //   } else if (crime = "CRIMINAL MISCHIEF"){
    //     color= 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
    //   }
    //     else 
    //   color= 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
    //   return color;
    // }



        // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

  
   //heatArray = [[30.281,-97.74260283], [30.29006613, -97.75024068], [30.31651937, -97.69235612], [30.26046527, -97.733699], [30.28890669, -97.75207498], [30.2678836, -97.74650601]]
  //   console.log(heatArray)
  //   console.log(L)
  //   let heat = L.heatLayer(heatArray, {
  //     radius: 20,
  //     blur: 35
  //   }).addTo(myMap);
  // });

  //   // Create a new marker cluster group.
// let markers = L.markerClusterGroup();
// let markerLength = 5
//   // Loop through the data.
// for (let i = 0; i < markerLength; i++) {
//     // Set the data location property to a variable.
//     let location = data[i];
//     // Check for the location property.
//     if (location) {
//       // Add a new marker to the cluster group, and bind a popup.
//       markers.addLayer(L.marker([location[1], location[2]])
//         .bindPopup("Hi"));
//     }
//   }
//   // Add our marker cluster layer to the map.
//   myMap.addLayer(markers);
});
