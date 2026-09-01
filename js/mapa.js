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

// função para criar link do Google Maps
function criarLinkRota(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// marcador do IFFar
var latIFFar = -28.66745003818483;
var lngIFFar = -55.99457590723304;
var linkRotaIFFar = criarLinkRota(latIFFar, lngIFFar);

L.marker([latIFFar, lngIFFar])
    .addTo(map)
    .bindPopup(`
        <div style="min-width: 200px;">
            <strong>Instituto Federal Farroupilha (IFFar)</strong><br>
            <small>Campus São Borja</small><br>
            <p style="margin: 8px 0;">Rua Otaviano Castilho Mendes, nº 355, Bairro Betim, São Borja/RS (CEP: 97670-000).</p>
            <a href="${linkRotaIFFar}" target="_blank" style="display: inline-block; background-color: #1a237e; color: white; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-weight: bold;">📍 Como Chegar</a>
        </div>
    `);

