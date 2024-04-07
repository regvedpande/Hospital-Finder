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
}