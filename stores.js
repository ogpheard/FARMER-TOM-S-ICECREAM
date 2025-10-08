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

        // The CSV has entries separated by multiple commas - each store entry is in format:
        // Name,Latitude,Longitude,Postcode,Website,Type,,,,
        outlets = [];

        // Split by groups of commas (stores are separated by ,,,,)
        const entries = csvText.split(',,,,');

        for (let entry of entries) {
            const parts = entry.split(',').map(p => p.trim());

            // Skip header row and empty entries
            if (parts[0] === 'Name' || parts[0] === '' || !parts[1] || !parts[2]) continue;

            const name = parts[0].replace(/^["']|["']$/g, '');
            const lat = parseFloat(parts[1]);
            const lng = parseFloat(parts[2]);
            const postcode = parts[3] ? parts[3].replace(/^["']|["']$/g, '') : '';
            const website = parts[4] ? parts[4].trim() : '';

            // Only add if we have valid coordinates
            if (!isNaN(lat) && !isNaN(lng) && name) {
                outlets.push({
                    name: name,
                    latitude: lat,
                    longitude: lng,
                    postcode: postcode,
                    website: website
                });
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

    // Show location permission prompt after a delay
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

                // Update distance note - ONLY show this text when location is enabled
                document.getElementById('distanceNote').textContent = 'Stores sorted by distance from your location';
                document.getElementById('distanceNote').style.display = 'block';

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
                // Hide permission box and distance note if user denies
                document.getElementById('locationPermission').style.display = 'none';
                document.getElementById('distanceNote').style.display = 'none';
                // Stores will still show in alphabetical order
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
        document.getElementById('locationPermission').style.display = 'none';
        document.getElementById('distanceNote').style.display = 'none';
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
