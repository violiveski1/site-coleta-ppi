var limites = [
    [-28.75, -56.10],
    [-28.60, -55.90]
];

// cria o mapa já dentro dos limites
var map = L.map('map', {
    maxBounds: limites,
    maxBoundsViscosity: 1.0,
    minZoom: 12,
    maxZoom: 16
}).setView([-28.6606, -56.0044], 13);

// camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// marcador
L.marker([-28.6606, -56.0044])
    .addTo(map)
    .bindPopup("São Borja - Ponto de coleta");

