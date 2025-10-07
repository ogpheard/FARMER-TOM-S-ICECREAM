// Ice Cream Products Data
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

// Image filename mapping
const imageMapping = {
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
    'Blackcurrant (Sorbet)': 'Icecream Product Shots/Sorbets/BlackCurrent.png',
    'Lemon (Sorbet)': 'Icecream Product Shots/Sorbets/lemon.png',
    'Mango (Sorbet)': 'Icecream Product Shots/Sorbets/mango.png',
    'Orange (Sorbet)': 'Icecream Product Shots/Sorbets/orange.png',
    'Passionfruit (Sorbet)': 'Icecream Product Shots/Sorbets/passion fruit.png',
    'Raspberry (Sorbet)': 'Icecream Product Shots/Sorbets/raspberry.png',
    'Vanilla Coconut': 'Icecream Product Shots/Plant-Based/Vanilla Coconut.png',
    'Chocolate Coconut': 'Icecream Product Shots/Plant-Based/Chocolate Coconut.png',
    'Caramel Coconut': 'Icecream Product Shots/Plant-Based/CARAMEL COCONUT.png',
    'Strawberry Coconut': 'Icecream Product Shots/Plant-Based/STRAWBERRY COCONUT.png',
    'Honeycomb Coconut': 'Icecream Product Shots/Plant-Based/HONEYCOMB COCONUT.png',
    'Vanilla (Milk Maid)': 'Icecream Product Shots/Milk Maid/Vanilla (milk maid).png',
    'Bubblegum (Milk Maid)': 'Icecream Product Shots/Milk Maid/Bubblegum (milk maid).png'
};

// Load ice cream data from JSON
async function loadIceCreamData() {
    try {
        const response = await fetch('ice_cream_data');
        iceCreamProducts = await response.json();

        // Check URL for category filter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        if (category) {
            // Activate the corresponding filter button
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                    document.querySelector('.filter-btn[data-category="all"]').classList.remove('active');
                }
            });
            displayProducts(category);
        } else {
            displayProducts('all');
        }
    } catch (error) {
        console.error('Error loading ice cream data:', error);
    }
}

// Display products
function displayProducts(category) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    let filteredProducts = iceCreamProducts;

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

        const grid = document.createElement('div');
        grid.className = 'products-grid';

        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            grid.appendChild(card);
        });

        container.appendChild(grid);
    } else {
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

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const imageFilename = imageMapping[product.name] || 'Existing Poduct Shots/background icecream image.avif';
    const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Parse sizes
    const sizes = JSON.parse(product.sizes.replace(/'/g, '"'));

    // Get allergens
    const allergens = [];
    if (product.allergens) {
        if (product.allergens.dairy === 'Y') allergens.push('Dairy');
        if (product.allergens.eggs === 'Y') allergens.push('Eggs');
        if (product.allergens.gluten === 'Y') allergens.push('Gluten');
        if (product.allergens.nuts === 'Y') allergens.push('Nuts');
        if (product.allergens.peanuts === 'Y') allergens.push('Peanuts');
        if (product.allergens.soya === 'Y') allergens.push('Soya');
        if (product.allergens.wheat === 'Y') allergens.push('Wheat');
    }

    const allergensText = allergens.length > 0 ? allergens.join(', ') : 'No major allergens';

    card.innerHTML = `
        <div class="product-card-header">
            <h4>${product.name}</h4>
        </div>
        <div class="product-image">
            <img src="${imageFilename}" alt="${product.name}" onerror="this.src='Existing Poduct Shots/background icecream image.avif'">
        </div>
        <div class="product-info">
            <a href="product.html?id=${productSlug}" class="see-button">SEE</a>
        </div>
        <div class="product-hover-details">
            <div class="hover-detail-section">
                <h5>Available Sizes</h5>
                <div class="hover-sizes">
                    ${sizes.map(size => `<span class="hover-size-badge">${size}</span>`).join('')}
                </div>
            </div>
            <div class="hover-detail-section">
                <h5>Allergens</h5>
                <div class="hover-allergens">
                    <span class="hover-allergen">${allergensText}</span>
                </div>
            </div>
            ${product.award ? `<div class="hover-detail-section">
                <div class="hover-award">🏆 ${product.award}</div>
            </div>` : ''}
            <a href="product.html?id=${productSlug}" class="see-button" style="margin-top: 1rem;">SEE MORE</a>
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
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            displayProducts(category);
        });
    });
});
