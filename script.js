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

// Ice Cream Products Data and Filtering
let iceCreamProducts = [];

// Product descriptions
const productDescriptions = {
    'Clotted Cream Vanilla': 'A luxurious blend of premium clotted cream and Madagascar vanilla, creating an indulgent and creamy experience with every scoop.',
    'Dairy Vanilla': 'Classic vanilla ice cream made with fresh dairy and natural vanilla extract for a timeless taste.',
    'Banana': 'Sweet and creamy banana ice cream with a natural fruit flavor that captures the essence of ripe bananas.',
    'Banoffee': 'A delightful combination of banana, toffee, and biscuit pieces inspired by the classic British dessert.',
    'Biscoff': 'Rich and creamy ice cream swirled with crunchy Biscoff cookie pieces and caramelized biscuit flavor.',
    'Black & Blue': 'A vibrant mix of blackberries and blueberries creating a fruity and refreshing treat.',
    'Blackberry Crumble': 'Sweet blackberries combined with buttery crumble pieces for a dessert-inspired delight.',
    'Black Cherry': 'Rich vanilla ice cream studded with sweet and tart black cherry pieces.',
    'Blackcurrant (Ice Cream)': 'Tangy blackcurrant flavor creates a refreshing and fruity ice cream experience.',
    'Candyfloss': 'Sweet and nostalgic candyfloss flavor that brings back memories of the fairground.',
    'Caramel Crunch': 'Smooth caramel ice cream with crunchy honeycomb pieces for delightful texture.',
    'Caffe Latte': 'Coffee lovers\' dream with rich espresso flavor and creamy milk.',
    'Cappuccino Crunch': 'Espresso ice cream with chocolate-covered coffee beans and a hint of cinnamon.',
    'Cherry Bakewell': 'Inspired by the classic tart, featuring cherry and almond flavors with cake pieces.',
    'Chocolate Orange': 'Rich chocolate ice cream infused with natural orange essence.',
    'Chunky Ginger': 'Warming ginger ice cream with chunks of crystallized ginger throughout.',
    'Coffee Mocha': 'A perfect blend of rich coffee and smooth chocolate for mocha lovers.',
    'Coconut Cream': 'Tropical coconut flavor with a rich and creamy texture.',
    'Cookie Dough': 'Vanilla ice cream loaded with chunks of edible chocolate chip cookie dough.',
    'Chocolate Caramel Crunch': 'Decadent chocolate ice cream with ribbons of caramel and crunchy pieces.',
    'Double Choc': 'For chocolate lovers - rich chocolate ice cream with chocolate chunks.',
    'Eton Mess': 'Strawberries, meringue pieces, and cream combined in this British classic.',
    'Honeycomb': 'Sweet vanilla ice cream packed with crunchy honeycomb pieces.',
    'Lemon Crunch': 'Zesty lemon ice cream with biscuit crunch for a refreshing citrus treat.',
    'Lemon Meringue': 'Tangy lemon ice cream swirled with sweet meringue pieces.',
    'Malty Munch': 'Malted milk flavor with chocolate-covered malt balls.',
    'Mango Swirl': 'Creamy vanilla ice cream with ribbons of sweet mango.',
    'Maple & Walnut': 'Rich maple syrup flavor combined with crunchy walnut pieces.',
    'Mint Choc Chunk': 'Refreshing mint ice cream loaded with dark chocolate chunks.',
    'Nuttytella': 'Hazelnut chocolate spread flavor with hazelnut pieces throughout.',
    'Oreo': 'Cookies and cream ice cream packed with Oreo cookie pieces.',
    'Pistachio': 'Authentic pistachio flavor with real pistachio pieces.',
    'Raspberry (Ice Cream)': 'Sweet and tart raspberry ice cream bursting with fruit flavor.',
    'Raspberry Pavlova': 'Raspberry ice cream with meringue pieces inspired by the classic dessert.',
    'Rum & Raisin': 'Traditional rum-soaked raisins in rich vanilla ice cream.',
    'Salted Caramel': 'Sweet caramel with a hint of sea salt for the perfect balance.',
    'Strawberry': 'Classic strawberry ice cream made with real strawberry pieces.',
    'Strawberry Cheesecake': 'Creamy cheesecake ice cream with strawberry swirl and biscuit pieces.',
    'Summer Fruits': 'A medley of summer berries in creamy vanilla ice cream.',
    'Toffee Fudge': 'Rich toffee ice cream with chunks of fudge pieces.',
    'Turkish Delight': 'Rose-flavored ice cream with Turkish delight pieces.',
    'White Chocolate Avalanche': 'Smooth white chocolate ice cream with chocolate flakes.',
    'White Choc & Honeycomb': 'White chocolate ice cream with crunchy honeycomb pieces.',
    'White Choc & Raspberry': 'White chocolate and raspberry create a fruity and indulgent combination.',
    '26 Miles': 'A special flavor celebrating endurance with caramel and chocolate.',
    'Blackcurrant (Sorbet)': 'Refreshing blackcurrant sorbet made with real fruit.',
    'Lemon (Sorbet)': 'Zesty lemon sorbet perfect for cleansing the palate.',
    'Mango (Sorbet)': 'Tropical mango sorbet bursting with exotic fruit flavor.',
    'Orange (Sorbet)': 'Refreshing orange sorbet with natural citrus tang.',
    'Passionfruit (Sorbet)': 'Exotic passionfruit creates a tart and tropical sorbet.',
    'Raspberry (Sorbet)': 'Vibrant raspberry sorbet made with premium fruit.',
    'Vanilla Coconut': 'Creamy vanilla flavor in a smooth coconut base for a dairy-free delight.',
    'Chocolate Coconut': 'Rich chocolate flavor in a creamy coconut base.',
    'Caramel Coconut': 'Sweet caramel in a smooth coconut base.',
    'Strawberry Coconut': 'Fresh strawberry flavor combined with creamy coconut.',
    'Honeycomb Coconut': 'Crunchy honeycomb pieces in a sweet coconut base.',
    'Vanilla (Milk Maid)': 'Light and refreshing vanilla with a unique milk formulation.',
    'Bubblegum (Milk Maid)': 'Fun bubblegum flavor that kids and adults love.'
};

// Image filename mapping based on actual files
const imageMapping = {
    // Normal ice creams
    'Clotted Cream Vanilla': 'Icecream Product Shots/Normal/cottage vanilla (normal).png',
    'Dairy Vanilla': 'Icecream Product Shots/Normal/cottage vanilla (normal).png',
    'Banana': 'Icecream Product Shots/Normal/banana normal.png',
    'Banoffee': 'Icecream Product Shots/Normal/BANOFFEE (normal).png',
    'Biscoff': 'Icecream Product Shots/Normal/Biscoff (normal).png',
    'Black & Blue': 'Icecream Product Shots/Normal/Black and Blue (normal).png',
    'Blackberry Crumble': 'Icecream Product Shots/Normal/Blackberry Crumble (normal).png',
    'Black Cherry': 'Icecream Product Shots/Normal/BlackCurrent (normal).png',
    'Blackcurrant (Ice Cream)': 'Icecream Product Shots/Normal/BlackCurrent (normal).png',
    'Candyfloss': 'Icecream Product Shots/Normal/Candyfloss (normal).png',
    'Caramel Crunch': 'Icecream Product Shots/Normal/caramel crunch.png',
    'Caffe Latte': 'Icecream Product Shots/Normal/Caffe Latte.png',
    'Cappuccino Crunch': 'Icecream Product Shots/Normal/Cappuccino Crunch.png',
    'Cherry Bakewell': 'Icecream Product Shots/Normal/Cherry Bakewell.png',
    'Chocolate Orange': 'Icecream Product Shots/Normal/chocolate orange.png',
    'Chunky Ginger': 'Icecream Product Shots/Normal/chunky ginger.png',
    'Coffee Mocha': 'Icecream Product Shots/Normal/Coffee Mocha.png',
    'Coconut Cream': 'Icecream Product Shots/Normal/coconut cream.png',
    'Cookie Dough': 'Icecream Product Shots/Normal/cookie dough.png',
    'Chocolate Caramel Crunch': 'Icecream Product Shots/Normal/chocolate caramel crunch.png',
    'Double Choc': 'Icecream Product Shots/Normal/DOUBLE CHOC.png',
    'Eton Mess': 'Icecream Product Shots/Normal/Eton Mess.png',
    'Honeycomb': 'Icecream Product Shots/Normal/honeycomb.png',
    'Lemon Crunch': 'Icecream Product Shots/Normal/lemon crunch.png',
    'Lemon Meringue': 'Icecream Product Shots/Normal/lemon meringue.png',
    'Malty Munch': 'Icecream Product Shots/Normal/malty munch.png',
    'Mango Swirl': 'Icecream Product Shots/Normal/mango swirl.png',
    'Maple & Walnut': 'Icecream Product Shots/Normal/maple and walnut.png',
    'Mint Choc Chunk': 'Icecream Product Shots/Normal/mint choc chunk.png',
    'Nuttytella': 'Icecream Product Shots/Normal/nuttytella.png',
    'Oreo': 'Icecream Product Shots/Normal/oreo.png',
    'Pistachio': 'Icecream Product Shots/Normal/pistachio.png',
    'Raspberry (Ice Cream)': 'Icecream Product Shots/Normal/raspberry.png',
    'Raspberry Pavlova': 'Icecream Product Shots/Normal/raspberry pavlova.png',
    'Rum & Raisin': 'Icecream Product Shots/Normal/rum and raisin.png',
    'Salted Caramel': 'Icecream Product Shots/Normal/salted caramel.png',
    'Strawberry': 'Icecream Product Shots/Normal/Strawberry.png',
    'Strawberry Cheesecake': 'Icecream Product Shots/Normal/Strawberry Cheesecake.png',
    'Summer Fruits': 'Icecream Product Shots/Normal/Summer Fruits.png',
    'Toffee Fudge': 'Icecream Product Shots/Normal/Toffee fudge.png',
    'Turkish Delight': 'Icecream Product Shots/Normal/TURKISH DELIGHT.png',
    'White Chocolate Avalanche': 'Icecream Product Shots/Normal/WHITE CHOCOLATE AVALANCHE.png',
    'White Choc & Honeycomb': 'Icecream Product Shots/Normal/WHITE CHOC & HONEYCOMB.png',
    'White Choc & Raspberry': 'Icecream Product Shots/Normal/WHITE CHOC & RASPBERRY.png',
    '26 Miles': 'Icecream Product Shots/Normal/26 MILES.png',

    // Sorbets
    'Blackcurrant (Sorbet)': 'Icecream Product Shots/Sorbets/BlackCurrent.png',
    'Lemon (Sorbet)': 'Icecream Product Shots/Sorbets/lemon.png',
    'Mango (Sorbet)': 'Icecream Product Shots/Sorbets/mango.png',
    'Orange (Sorbet)': 'Icecream Product Shots/Sorbets/orange.png',
    'Passionfruit (Sorbet)': 'Icecream Product Shots/Sorbets/passion fruit.png',
    'Raspberry (Sorbet)': 'Icecream Product Shots/Sorbets/raspberry.png',

    // Plant-based
    'Vanilla Coconut': 'Icecream Product Shots/Plant-Based/Vanilla Coconut.png',
    'Chocolate Coconut': 'Icecream Product Shots/Plant-Based/Chocolate Coconut.png',
    'Caramel Coconut': 'Icecream Product Shots/Plant-Based/CARAMEL COCONUT.png',
    'Strawberry Coconut': 'Icecream Product Shots/Plant-Based/STRAWBERRY COCONUT.png',
    'Honeycomb Coconut': 'Icecream Product Shots/Plant-Based/HONEYCOMB COCONUT.png',

    // Milk Maid
    'Vanilla (Milk Maid)': 'Icecream Product Shots/Milk Maid/Vanilla (milk maid).png',
    'Bubblegum (Milk Maid)': 'Icecream Product Shots/Milk Maid/Bubblegum (milk maid).png'
};

// Function to parse CSV
async function loadIceCreamData() {
    try {
        const response = await fetch('Ice_Cream_Database.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');

        iceCreamProducts = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Parse CSV properly handling quoted fields
            const values = parseCSVLine(line);

            const product = {
                name: values[0],
                type: values[1],
                award: values[2],
                sizes: values[3] ? values[3].replace(/[\[\]']/g, '').split(', ') : [],
                allergies: {
                    dairy: values[11] === 'Y',
                    eggs: values[12] === 'Y',
                    gluten: values[13] === 'Y',
                    nuts: values[14] === 'Y',
                    oats: values[15] === 'Y',
                    peanuts: values[16] === 'Y',
                    soya: values[17] === 'Y',
                    sulphites: values[18] === 'Y',
                    sulphurDioxide: values[19] === 'Y',
                    wheat: values[20] === 'Y',
                    other: values[21]
                },
                sizeAvailability: {
                    '120ml': values[4] === 'True',
                    '1ltr': values[5] === 'True',
                    '2ltr': values[6] === 'True',
                    '2.4ltr': values[7] === 'True',
                    '4ltr': values[8] === 'True',
                    '4.5ltr': values[9] === 'True',
                    '10ltr': values[10] === 'True'
                }
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

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
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

    const imageFilename = imageMapping[product.name] || 'Existing Poduct Shots/background icecream image.avif';

    card.innerHTML = `
        <div class="product-image">
            <img src="${imageFilename}" alt="${product.name}" onerror="this.src='Existing Poduct Shots/background icecream image.avif'">
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <button class="see-button" data-product="${product.name}">SEE</button>
        </div>
    `;

    // Add click event to SEE button
    const seeButton = card.querySelector('.see-button');
    seeButton.addEventListener('click', () => openProductModal(product));

    return card;
}

// Modal functionality
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalProductImage');
    const modalName = document.getElementById('modalProductName');
    const modalAward = document.getElementById('modalProductAward');
    const modalDescription = document.getElementById('modalProductDescription');
    const modalSizes = document.getElementById('modalProductSizes');
    const modalAllergies = document.getElementById('modalProductAllergies');
    const modalAllergySection = document.getElementById('modalAllergySection');

    // Set product image
    const imageFilename = imageMapping[product.name] || 'Existing Poduct Shots/background icecream image.avif';
    modalImage.src = imageFilename;
    modalImage.alt = product.name;

    // Set product name
    modalName.textContent = product.name;

    // Set award if exists
    if (product.award) {
        modalAward.textContent = `🏆 ${product.award}`;
        modalAward.style.display = 'block';
    } else {
        modalAward.style.display = 'none';
    }

    // Set description
    modalDescription.textContent = productDescriptions[product.name] || 'A delicious ice cream flavor.';

    // Set sizes
    const availableSizes = product.sizes.filter(size => size.trim() !== '');
    modalSizes.textContent = availableSizes.length > 0 ? availableSizes.join(', ') : 'Various sizes available';

    // Set allergies
    modalAllergies.innerHTML = '';
    const allergyList = [];

    if (product.allergies.dairy) allergyList.push('Dairy');
    if (product.allergies.eggs) allergyList.push('Eggs');
    if (product.allergies.gluten) allergyList.push('Gluten');
    if (product.allergies.nuts) allergyList.push('Nuts');
    if (product.allergies.oats) allergyList.push('Oats');
    if (product.allergies.peanuts) allergyList.push('Peanuts');
    if (product.allergies.soya) allergyList.push('Soya');
    if (product.allergies.sulphites) allergyList.push('Sulphites');
    if (product.allergies.sulphurDioxide) allergyList.push('Sulphur Dioxide');
    if (product.allergies.wheat) allergyList.push('Wheat');

    if (allergyList.length > 0) {
        allergyList.forEach(allergy => {
            const li = document.createElement('li');
            li.textContent = `Contains ${allergy}`;
            modalAllergies.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No major allergens';
        modalAllergies.appendChild(li);
    }

    if (product.allergies.other && product.allergies.other !== '*') {
        const li = document.createElement('li');
        li.textContent = product.allergies.other;
        modalAllergies.appendChild(li);
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('productModal');

    modalClose.addEventListener('click', closeProductModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
});

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
