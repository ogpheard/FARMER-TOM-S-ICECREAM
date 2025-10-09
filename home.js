// Load ice cream data
let iceCreamData = [];

async function loadIceCreamData() {
    try {
        const response = await fetch('ice_cream_data');
        iceCreamData = await response.json();
        populateNewFor2025();
    } catch (error) {
        console.error('Error loading ice cream data:', error);
    }
}

// Map product names to image filenames
function getImageFilename(product) {
    // Remove anything in parentheses from the product name
    const baseName = product.name.replace(/\s*\([^)]*\)/g, '').trim();
    let folder = '';

    if (product.type === 'Normal') {
        folder = 'Normal';
    } else if (product.type === 'Milk Maid') {
        folder = 'Milk Maid';
    } else if (product.type.includes('Plant-based') || product.type.includes('Coconut')) {
        folder = 'Plant-Based';
    } else if (product.type === 'Sorbet') {
        folder = 'Sorbets';
    }

    // Check various filename formats
    const possibleFormats = [
        `Icecream Product Shots/${folder}/${baseName}.png`,
        `Icecream Product Shots/${folder}/${baseName} (normal).png`,
        `Icecream Product Shots/${folder}/${baseName.toUpperCase()}.png`,
        `Icecream Product Shots/${folder}/${baseName} normal.png`,
    ];

    // Return the first format (will use onerror to handle missing files)
    return possibleFormats[0];
}

// Populate New for 2025 section
function populateNewFor2025() {
    const newProductsGrid = document.getElementById('newProducts');
    if (!newProductsGrid) return;

    // Select specific products for "new for 2025" - one from each category
    const sorbetProduct = iceCreamData.find(p => p.type === 'Sorbet' && p.name === 'Mango (Sorbet)');
    const coconutProduct = iceCreamData.find(p => p.type === 'Plant-based (Coconut)' && p.name === 'Chocolate Coconut');
    const milkMaidProduct = iceCreamData.find(p => p.type === 'Milk Maid' && p.name === 'Bubblegum (Milk Maid)');

    const newProducts = [sorbetProduct, coconutProduct, milkMaidProduct].filter(Boolean);

    newProductsGrid.innerHTML = newProducts.map(product => {
        const imageUrl = getImageFilename(product);
        // Create slug for product URL
        const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        return `
            <div class="new-product-card">
                <div class="new-product-image">
                    <img src="${imageUrl}" alt="${product.name}" onerror="this.src='Existing Poduct Shots/background icecream image.avif'; console.log('Image not found, using fallback for: ${product.name}')">
                </div>
                <div class="new-product-info">
                    <h3>${product.name}</h3>
                    ${product.award ? `<p class="award-badge">${product.award}</p>` : ''}
                    <a href="product.html?id=${productSlug}" class="see-button">VIEW PRODUCT</a>
                </div>
            </div>
        `;
    }).join('');
}

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadIceCreamData();
});

// Navigation scroll effect (video effects removed)
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe category cards and award items
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    const awardItems = document.querySelectorAll('.award-item');

    categoryCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    awardItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
});
