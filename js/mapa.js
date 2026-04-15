// Coordenadas de São Borja - RS
var map = L.map('map').setView([-28.6606, -56.0044], 13);

// Camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marcador em São Borja
L.marker([-28.6606, -56.0044])
    .addTo(map)
    .bindPopup("<b>São Borja</b><br>Ponto de coleta eletrônico")
    .openPopup();
