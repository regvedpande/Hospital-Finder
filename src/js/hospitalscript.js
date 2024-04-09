var map = L.map("map-container").setView([21.1401, 79.0820], 6); 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function showLoader() {
  document.querySelector(".loading").style.display = "block";
}

function hideLoader() {
  document.querySelector(".loading").style.display = "none";
}

function findHospitals() {
  showLoader();

  var cityName = document.getElementById('city').value;
  var areaName = document.getElementById('area').value;

  fetch('https://nominatim.openstreetmap.org/search?q=' + areaName + ', ' + cityName + ', India&format=json')
    .then(response => response.json())
    .then(locationData => {
      if (locationData.length > 0) {
        var lat = parseFloat(locationData[0].lat);
        var lon = parseFloat(locationData[0].lon);

        // Overpass API query for hospitals
        fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:10000,${lat},${lon})[amenity=hospital];out;`)
          .then(response => response.json())
          .then(hospitalData => {
            hideLoader();

            if (hospitalData.elements.length > 0) {
              var hospitalList = document.getElementById('hospitals-list');
              hospitalList.innerHTML = ''; 

              hospitalData.elements.forEach(element => {
                var hospitalName = element.tags.name || 'Unnamed Hospital'; 
                var listItem = document.createElement('div');
                listItem.classList.add('hospital-item');
                listItem.textContent = hospitalName; // No link for simplicity
                hospitalList.appendChild(listItem);
              });

              hospitalList.style.display = 'block'; 
            } else {
              hideLoader();
              alert('No hospitals found within the area.');
            }
          })
          .catch(error => {
            hideLoader();
            console.error('Error fetching hospital data:', error);
          });
      } else {
        hideLoader();
        alert('Location not found.');
      }
    })
    .catch(error => {
      hideLoader();
      console.error('Error fetching location data:', error);
    });
}