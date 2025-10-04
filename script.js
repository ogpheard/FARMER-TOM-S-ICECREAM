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

// Observe all product cards, category cards, and award items
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const categoryCards = document.querySelectorAll('.category-card');
    const awardItems = document.querySelectorAll('.award-item');

    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    categoryCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    awardItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
});

// Navigation scroll effect and darkening overlay
let lastScroll = 0;
const nav = document.querySelector('.nav');
const darkeningOverlay = document.querySelector('.scroll-darkening-overlay');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Navigation effect
    if (currentScroll > 100) {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.boxShadow = 'none';
    }

    // Darkening overlay effect - starts after hero section
    if (currentScroll > windowHeight) {
        const scrollDistance = currentScroll - windowHeight;
        const maxDarkness = 600; // Distance to scroll for full darkness
        const opacity = Math.min(scrollDistance / maxDarkness, 0.6);
        darkeningOverlay.style.opacity = opacity;
    } else {
        darkeningOverlay.style.opacity = 0;
    }

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

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 - scrolled * 0.0001})`;
    }
});

// Add hover effect to content images
const contentImages = document.querySelectorAll('.content-image');
contentImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.02)';
    });
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Ice Cream Products Data and Filtering
let iceCreamProducts = [];

// Function to parse CSV
async function loadIceCreamData() {
    try {
        const response = await fetch('ice cream database.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');

        iceCreamProducts = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = line.split(',');
            const product = {
                name: values[0],
                type: values[1],
                award: values[2],
                sizes: values[3] ? values[3].replace(/[\[\]']/g, '').split(', ').join(', ') : ''
            };

            if (product.name) {
                iceCreamProducts.push(product);
            }
        }

        displayProducts('all');
    } catch (error) {
        console.error('Error loading ice cream data:', error);
    }
}

// Function to get image filename from product name
function getImageFilename(name, type) {
    // Map product names to image filenames
    const imageMap = {
        'Clotted Cream Vanilla': 'Clotted Cream Vanilla.avif',
        'Dairy Vanilla': 'dairy vanilla.avif',
        'Banana': 'banana.avif',
        'Banoffee': 'banoffe.avif',
        'Biscoff': 'biscoff.avif',
        'Black & Blue': 'black & blue.avif',
        'Blackberry Crumble': 'BLACKBERRY CRUMBLE.avif',
        'Black Cherry': 'BLACK CHERRY.avif',
        'Blackcurrant (Ice Cream)': 'BLACKCURRANT.avif',
        'Candyfloss': 'CANDYFLOSS.avif',
        'Caramel Crunch': 'CARAMEL CRUNCH.avif',
        'Caffe Latte': 'CAFFE LATTE.avif',
        'Cappuccino Crunch': 'CAPPUCCINO CRUNCH.avif',
        'Cherry Bakewell': 'CHERRY BAKEWELL.avif',
        'Chocolate Orange': 'CHOCOLATE ORANGE.avif',
        'Chunky Ginger': 'CHUNKY GINGER.avif',
        'Coffee Mocha': 'COFFEE MOCHA.avif',
        'Coconut Cream': 'COCONUT CREAM.avif',
        'Cookie Dough': 'COOKIE DOUGH.avif',
        'Chocolate Caramel Crunch': 'CHOCOLATE CARAMEL CRUNCH.avif',
        'Double Choc': 'DOUBLE CHOC.avif',
        'Eton Mess': 'ETON MESS.avif',
        'Honeycomb': 'HONEYCOMB.avif',
        'Lemon Crunch': 'LEMON CRUNCH.avif',
        'Lemon Meringue': 'LEMON MERINGUE.avif',
        'Malty Munch': 'MALTY MUNCH.avif',
        'Mango Swirl': 'MANGO SWIRL.avif',
        'Maple & Walnut': 'MAPLE & WALNUT.avif',
        'Mint Choc Chunk': 'MINT CHOC CHUNK.avif',
        'Nuttytella': 'NUTTYTELLA.avif',
        'Oreo': 'OREO.avif',
        'Pistachio': 'PISTACHIO.avif',
        'Raspberry (Ice Cream)': 'RASPBERRY.avif',
        'Raspberry Pavlova': 'RASPBERRY PAVLOVA.avif',
        'Rum & Raisin': 'RUM & RAISIN.avif',
        'Salted Caramel': 'SALTED CARAMEL.avif',
        'Strawberry': 'STRAWBERRY.avif',
        'Strawberry Cheesecake': 'STRAWBERRY CHEESECAKE.avif',
        'Summer Fruits': 'SUMMER FRUITS.avif',
        'Toffee Fudge': 'TOFFEE FUDGE.avif',
        'Turkish Delight': 'TURKISH DELIGHT.avif',
        'White Chocolate Avalanche': 'WHITE CHOCOLATE AVALANCHE.avif',
        'White Choc & Honeycomb': 'WHITE CHOC & HONEYCOMB.avif',
        'White Choc & Raspberry': 'WHITE CHOC & RASPBERRY.avif',
        '26 Miles': '26 MILES.avif',
        'Blackcurrant (Sorbet)': 'Blackcurrant Sorbet.avif',
        'Lemon (Sorbet)': 'lemon sorbet.avif',
        'Mango (Sorbet)': 'mango sorbet.avif',
        'Orange (Sorbet)': 'orange sorbet.avif',
        'Passionfruit (Sorbet)': 'passion fruit sorbet.avif',
        'Raspberry (Sorbet)': 'raspberry sorbet.avif',
        'Vanilla Coconut': 'plant based-Vanilla Coconut .avif',
        'Chocolate Coconut': 'plant based Chocolate Coconut Blob.avif',
        'Caramel Coconut': 'plant based - Caramel Coconut.avif',
        'Strawberry Coconut': 'plant based - Strawberry Coconut.avif',
        'Honeycomb Coconut': 'plant based- Honeycomb Coconut.avif',
        'Vanilla (Milk Maid)': 'Milk Maid Vanilla.avif',
        'Bubblegum (Milk Maid)': 'Milk Made BUBBLEGUM.avif'
    };

    return imageMap[name] || 'default.avif';
}

// Function to display products
function displayProducts(category) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    let filteredProducts = iceCreamProducts;

    // Filter by category
    if (category !== 'all') {
        if (category === 'normal') {
            filteredProducts = iceCreamProducts.filter(p => p.type === 'Normal');
        } else if (category === 'milkmaid') {
            filteredProducts = iceCreamProducts.filter(p => p.type === 'Milk Maid');
        } else if (category === 'coconut') {
            filteredProducts = iceCreamProducts.filter(p => p.type === 'Plant-based (Coconut)');
        } else if (category === 'sorbet') {
            filteredProducts = iceCreamProducts.filter(p => p.type === 'Sorbet');
        }

        // Display without category grouping
        const grid = document.createElement('div');
        grid.className = 'products-grid';

        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            grid.appendChild(card);
        });

        container.appendChild(grid);
    } else {
        // Display all with category grouping
        const categories = [
            { name: 'Classic Ice Cream', type: 'Normal' },
            { name: 'Milk Maid', type: 'Milk Maid' },
            { name: 'Coconut Plant-Based', type: 'Plant-based (Coconut)' },
            { name: 'Sorbets', type: 'Sorbet' }
        ];

        categories.forEach(cat => {
            const categoryProducts = iceCreamProducts.filter(p => p.type === cat.type);

            if (categoryProducts.length > 0) {
                const categoryGroup = document.createElement('div');
                categoryGroup.className = 'category-group';

                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = cat.name;
                categoryGroup.appendChild(categoryTitle);

                const grid = document.createElement('div');
                grid.className = 'products-grid';

                categoryProducts.forEach(product => {
                    const card = createProductCard(product);
                    grid.appendChild(card);
                });

                categoryGroup.appendChild(grid);
                container.appendChild(categoryGroup);
            }
        });
    }
}

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imageFilename = getImageFilename(product.name, product.type);

    card.innerHTML = `
        <div class="product-image">
            <img src="Ice Cream Flavours/${imageFilename}" alt="${product.name}" onerror="this.src='Existing Poduct Shots/background icecream image.avif'">
        </div>
        <div class="product-info">
            <span class="product-type">${product.type}</span>
            <h4>${product.name}</h4>
            ${product.award ? `<div class="product-award">🏆 ${product.award}</div>` : ''}
            <div class="product-sizes">Available sizes: ${product.sizes || 'Various sizes'}</div>
        </div>
    `;

    return card;
}

// Filter button functionality
document.addEventListener('DOMContentLoaded', () => {
    loadIceCreamData();

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Display products for selected category
            const category = btn.getAttribute('data-category');
            displayProducts(category);
        });
    });

    // Check URL hash for category
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const category = urlParams.get('category');
    if (category) {
        const btn = document.querySelector(`[data-category="${category}"]`);
        if (btn) {
            btn.click();
        }
    }
});
