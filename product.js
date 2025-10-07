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

// Image mapping
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

// Allergen icons SVG
const allergenIcons = {
    'gluten': '<svg viewBox="0 0 64 64"><path d="M32 8 L24 24 L8 32 L24 40 L32 56 L40 40 L56 32 L40 24 Z"/><text x="32" y="38" text-anchor="middle" font-size="16">🌾</text></svg>',
    'crustacean': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">🦐</text></svg>',
    'eggs': '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="32" rx="18" ry="24" fill="#fff" stroke="#333" stroke-width="2"/></svg>',
    'fish': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">🐟</text></svg>',
    'peanuts': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">🥜</text></svg>',
    'soya': '<svg viewBox="0 0 64 64"><circle cx="20" cy="32" r="10" fill="#666"/><circle cx="32" cy="32" r="10" fill="#666"/><circle cx="44" cy="32" r="10" fill="#666"/></svg>',
    'dairy': '<svg viewBox="0 0 64 64"><rect x="16" y="12" width="32" height="40" rx="2" fill="#fff" stroke="#333" stroke-width="2"/><rect x="16" y="12" width="32" height="12" fill="#333"/></svg>',
    'nuts': '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="16" fill="#8B4513"/><path d="M32 16 Q40 24 32 32 Q24 24 32 16" fill="#654321"/></svg>',
    'celery': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="20">🌿</text></svg>',
    'mustard': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">🌭</text></svg>',
    'sesame': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="20">○○○</text></svg>',
    'sulphites': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="16">SO₂</text></svg>',
    'shellfish': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">🐚</text></svg>',
    'lupin': '<svg viewBox="0 0 64 64"><text x="32" y="40" text-anchor="middle" font-size="24">○○</text></svg>'
};

// Load product data
async function loadProductData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            window.location.href = 'products.html';
            return;
        }

        const response = await fetch('ice_cream_data');
        const products = await response.json();

        const product = products.find(p => {
            const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return slug === productId;
        });

        if (!product) {
            window.location.href = 'products.html';
            return;
        }

        displayProduct(product);
    } catch (error) {
        console.error('Error loading product:', error);
    }
}

// Display product
function displayProduct(product) {
    // Set image
    const productImage = document.getElementById('productImage');
    const imageFilename = imageMapping[product.name] || 'Existing Poduct Shots/background icecream image.avif';
    productImage.src = imageFilename;
    productImage.alt = product.name;

    // Set name
    document.getElementById('productName').textContent = product.name;
    document.title = `${product.name} - Farmer Tom's Ice Cream`;

    // Set award
    const awardEl = document.getElementById('productAward');
    if (product.award) {
        awardEl.textContent = `🏆 ${product.award}`;
        awardEl.style.display = 'block';
    } else {
        awardEl.style.display = 'none';
    }

    // Set description
    document.getElementById('productDescription').textContent = productDescriptions[product.name] || 'A delicious ice cream flavor.';

    // Set sizes
    const sizesEl = document.getElementById('productSizes');
    const sizes = JSON.parse(product.sizes.replace(/'/g, '"'));
    sizesEl.innerHTML = sizes.map(size => `<span class="size-badge">${size}</span>`).join('');

    // Set allergens with icons
    const allergensEl = document.getElementById('productAllergens');
    allergensEl.innerHTML = '';

    if (product.allergens) {
        const allergenList = [];

        if (product.allergens.dairy === 'Y') {
            allergenList.push({ name: 'Milk', icon: 'dairy' });
        }
        if (product.allergens.eggs === 'Y') {
            allergenList.push({ name: 'Eggs', icon: 'eggs' });
        }
        if (product.allergens.gluten === 'Y') {
            allergenList.push({ name: 'Gluten', icon: 'gluten' });
        }
        if (product.allergens.nuts === 'Y') {
            allergenList.push({ name: 'Nuts', icon: 'nuts' });
        }
        if (product.allergens.peanuts === 'Y') {
            allergenList.push({ name: 'Peanuts', icon: 'peanuts' });
        }
        if (product.allergens.soya === 'Y') {
            allergenList.push({ name: 'Soya', icon: 'soya' });
        }
        if (product.allergens.wheat === 'Y') {
            allergenList.push({ name: 'Wheat', icon: 'gluten' });
        }
        if (product.allergens.sulphites === 'Y') {
            allergenList.push({ name: 'Sulphites', icon: 'sulphites' });
        }

        if (allergenList.length > 0) {
            allergenList.forEach(allergen => {
                const allergenDiv = document.createElement('div');
                allergenDiv.className = 'allergen-item';
                allergenDiv.innerHTML = `
                    <div class="allergen-icon">${allergenIcons[allergen.icon] || ''}</div>
                    <div class="allergen-name">${allergen.name}</div>
                `;
                allergensEl.appendChild(allergenDiv);
            });
        } else {
            allergensEl.innerHTML = '<p class="no-allergens">No major allergens</p>';
        }

        // Add other allergen info if present
        if (product.allergens.other && product.allergens.other !== '*') {
            const otherInfo = document.createElement('p');
            otherInfo.className = 'allergen-other';
            otherInfo.textContent = product.allergens.other;
            allergensEl.appendChild(otherInfo);
        }
    }
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadProductData);
