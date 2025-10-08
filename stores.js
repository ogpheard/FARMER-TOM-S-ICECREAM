// Store outlets data
let outlets = [];
let map;
let markers = [];
let userLocation = null;
let currentOutletType = 'retail'; // 'retail' or 'catering'

// Custom cow icon
const cowIcon = L.icon({
    iconUrl: 'little cow logo (no background).png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Parse CSV data - handling quoted fields properly
async function loadOutlets() {
    try {
        const response = await fetch('outlets locations.csv');
        const text = await response.text();

        outlets = [];

        // Split by the 4-comma separator
        const entries = text.split(',,,,');

        for (let entry of entries) {
            entry = entry.trim();
            if (!entry) continue;

            // Parse CSV with quoted fields
            const fields = parseCSVRow(entry);

            if (fields.length < 4) continue;

            const name = fields[0].trim();
            const lat = parseFloat(fields[1]);
            const lng = parseFloat(fields[2]);
            const postcode = fields[3] ? fields[3].trim() : '';
            const website = fields[4] ? fields[4].trim() : '';

            // Skip header and validate
            if (name && name !== 'Name' && !isNaN(lat) && !isNaN(lng)) {
                outlets.push({
                    name: name,
                    latitude: lat,
                    longitude: lng,
                    postcode: postcode,
                    website: website
                });
            }
        }

        console.log(`✅ Loaded ${outlets.length} outlets (expected 62)`);

        if (outlets.length !== 62) {
            console.warn(`⚠️ Warning: Expected 62 stores but loaded ${outlets.length}`);
        }

        initializeMap();
        displayOutlets();

    } catch (error) {
        console.error('❌ Error loading outlets:', error);
    }
}

// Properly parse CSV row with quoted fields
function parseCSVRow(row) {
    const fields = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        const nextChar = row[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // Field separator
            fields.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    // Add last field
    fields.push(current);

    return fields;
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

    // Check if location was previously enabled
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
        const loc = JSON.parse(savedLocation);
        userLocation = { lat: loc.lat, lng: loc.lng };

        // Add user marker
        L.marker([userLocation.lat, userLocation.lng], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            })
        }).addTo(map).bindPopup('You are here');

        // Update UI
        document.getElementById('distanceNote').textContent = 'Stores sorted by distance from your location';
        document.getElementById('distanceNote').style.display = 'block';

        // Recenter on user
        map.setView([userLocation.lat, userLocation.lng], 11);

        // Display with distance
        displayOutlets();
    } else {
        // Show location permission prompt after a delay if not saved
        setTimeout(() => {
            document.getElementById('locationPermission').style.display = 'block';
        }, 1000);
    }
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

                // Save to localStorage so it persists on refresh
                localStorage.setItem('userLocation', JSON.stringify(userLocation));

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

    console.log(`📍 Displaying ${sortedOutlets.length} stores`);

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
                <div class="outlet-postcode">${outlet.postcode}</div>
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

// Toggle between retail and catering outlets
function toggleOutletType(type) {
    currentOutletType = type;

    // Update active button
    const buttons = document.querySelectorAll('.outlet-toggle-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-type') === type) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update header text
    const subtitle = document.getElementById('headerSubtitle');
    if (type === 'retail') {
        subtitle.textContent = 'Where can you buy our products to enjoy at home?';
    } else {
        subtitle.textContent = 'Where can you find our ice cream when out and about?';
    }

    // Re-display outlets (in real implementation, this would filter data)
    displayOutlets();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadOutlets();

    // Add toggle button listeners
    const toggleButtons = document.querySelectorAll('.outlet-toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            toggleOutletType(type);
        });
    });
});
