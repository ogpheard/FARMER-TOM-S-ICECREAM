// Store outlets data
let outlets = [];
let map;
let markers = [];
let userLocation = null;

// Custom cow icon
const cowIcon = L.icon({
    iconUrl: 'little cow logo (no background).png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Parse CSV data
async function loadOutlets() {
    try {
        const response = await fetch('outlets locations.csv');
        const csvText = await response.text();

        // Parse CSV
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');

        outlets = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Handle CSV parsing with quoted fields
            const values = parseCSVLine(line);

            if (values.length >= 5 && values[0] && values[1] && values[2]) {
                const outlet = {
                    name: values[0].trim(),
                    latitude: parseFloat(values[1]),
                    longitude: parseFloat(values[2]),
                    postcode: values[3] ? values[3].trim() : '',
                    website: values[4] ? values[4].trim() : '',
                    type: values[5] ? values[5].trim() : 'Retail'
                };

                // Only add if coordinates are valid
                if (!isNaN(outlet.latitude) && !isNaN(outlet.longitude)) {
                    outlets.push(outlet);
                }
            }
        }

        console.log(`Loaded ${outlets.length} outlets`);
        initializeMap();
        displayOutlets();

    } catch (error) {
        console.error('Error loading outlets:', error);
    }
}

// Simple CSV line parser
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);

    return result;
}

// Initialize the map
function initializeMap() {
    // Center on Devon, UK
    map = L.map('map').setView([50.7, -3.9], 9);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add markers for all outlets
    outlets.forEach(outlet => {
        const marker = L.marker([outlet.latitude, outlet.longitude], { icon: cowIcon })
            .addTo(map);

        // Create popup content
        const popupContent = `
            <div class="popup-content">
                <h3>${outlet.name}</h3>
                <p class="postcode">${outlet.postcode}</p>
                ${outlet.website ? `<a href="${outlet.website}" target="_blank" rel="noopener noreferrer">Website Link</a>` : '<p class="no-website">No website available</p>'}
            </div>
        `;

        marker.bindPopup(popupContent);
        markers.push({ marker, outlet });
    });

    // Show location permission prompt
    setTimeout(() => {
        document.getElementById('locationPermission').style.display = 'block';
    }, 1000);
}

// Request user location
function requestLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Hide permission box
                document.getElementById('locationPermission').style.display = 'none';

                // Update distance note
                document.getElementById('distanceNote').textContent = 'Stores sorted by distance from your location';

                // Add user location marker
                L.marker([userLocation.lat, userLocation.lng], {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                    })
                }).addTo(map).bindPopup('You are here');

                // Recenter map on user
                map.setView([userLocation.lat, userLocation.lng], 11);

                // Re-display outlets sorted by distance
                displayOutlets();
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. The list will show stores in alphabetical order.');
                document.getElementById('locationPermission').style.display = 'none';
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
        document.getElementById('locationPermission').style.display = 'none';
    }
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Display outlets list
function displayOutlets() {
    const outletsList = document.getElementById('outletsList');

    // Sort outlets
    let sortedOutlets = [...outlets];
    if (userLocation) {
        sortedOutlets = sortedOutlets.map(outlet => ({
            ...outlet,
            distance: calculateDistance(
                userLocation.lat,
                userLocation.lng,
                outlet.latitude,
                outlet.longitude
            )
        })).sort((a, b) => a.distance - b.distance);
    } else {
        sortedOutlets.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Generate HTML
    outletsList.innerHTML = sortedOutlets.map(outlet => {
        const distanceBadge = outlet.distance
            ? `<span class="outlet-distance">${outlet.distance.toFixed(1)} miles away</span>`
            : '';

        const websiteLink = outlet.website
            ? `<a href="${outlet.website}" class="outlet-website" target="_blank" rel="noopener noreferrer">Website Link</a>`
            : '<span class="no-website">No website available</span>';

        return `
            <div class="outlet-card" onclick="focusMarker(${outlet.latitude}, ${outlet.longitude})">
                <h3>${outlet.name}</h3>
                ${distanceBadge}
                <div class="outlet-address">${outlet.postcode}</div>
                ${websiteLink}
            </div>
        `;
    }).join('');
}

// Focus on a marker when outlet card is clicked
function focusMarker(lat, lng) {
    map.setView([lat, lng], 15);

    // Find and open the marker's popup
    markers.forEach(({ marker, outlet }) => {
        if (outlet.latitude === lat && outlet.longitude === lng) {
            marker.openPopup();
        }
    });

    // Scroll to map
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadOutlets);
