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
    const imageName = product.name.replace(/\s*\([^)]*\)/g, '');
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

    return `Icecream Product Shots/${folder}/${imageName}.png`;
}

// Populate New for 2025 section
function populateNewFor2025() {
    const newProductsGrid = document.getElementById('newProducts');
    if (!newProductsGrid) return;

    // Select 3 random products as "new for 2025"
    const newProducts = iceCreamData
        .filter(p => p.type === 'Normal')
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    newProductsGrid.innerHTML = newProducts.map(product => {
        const imageUrl = getImageFilename(product);
        return `
            <div class="new-product-card">
                <div class="new-product-image">
                    <img src="${imageUrl}" alt="${product.name}" onerror="console.error('Failed to load:', '${imageUrl}')">
                </div>
                <div class="new-product-info">
                    <h3>${product.name}</h3>
                    ${product.award ? `<p class="award-badge">${product.award}</p>` : ''}
                    <a href="product.html?name=${encodeURIComponent(product.name)}" class="see-button">VIEW PRODUCT</a>
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
