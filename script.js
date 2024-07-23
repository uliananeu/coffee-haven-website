document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const wishlistButtons = document.querySelectorAll('.wishlist');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productData = JSON.parse(e.target.dataset.product);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.name === productData.name);

            if (existingProductIndex === -1) {
                productData.quantity = 1;
                cart.push(productData);
            } else {
                cart[existingProductIndex].quantity++;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            showTemporaryAlert(`${productData.name} has been added to your cart!`);
        });
    });

    addToFavoritesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productData = JSON.parse(e.target.dataset.product);
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const existingProductIndex = favorites.findIndex(item => item.name === productData.name);

            if (existingProductIndex === -1) {
                productData.quantity = 1;
                favorites.push(productData);
            } else {
                favorites[existingProductIndex].quantity++;
            }

            localStorage.setItem('favorites', JSON.stringify(cart));
            showTemporaryAlert(`${productData.name} has been added to your Favorites!`);
        });
    });

    wishlistButtons.forEach(button => {
        const productData = JSON.parse(button.dataset.product);
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const existingProductIndex = favorites.findIndex(item => item.name === productData.name);

        if (existingProductIndex !== -1) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-heart"></i>'; 
        }

        button.addEventListener('click', function() {
            toggleWishlist(button);
        });
    });
});

function showTemporaryAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('custom-alert');
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function toggleWishlist(button) {
    const productData = JSON.parse(button.dataset.product);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const existingProductIndex = favorites.findIndex(item => item.name === productData.name);

    if (existingProductIndex === -1) {
        favorites.push(productData);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart" style="color: #e74c3c;"></i>'; 
    } else {
        favorites.splice(existingProductIndex, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="far fa-heart"></i>'; 
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const menuBar = document.querySelector('.menu-bar');
    if (window.scrollY > 0) {
        menuBar.classList.add('fixed-menu');
    } else {
        menuBar.classList.remove('fixed-menu');
    }
});

function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('open');
}

let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.menu-bar');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containHide()) {
        header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        header.classList.remove('hide');
    }

    lastScroll = scrollPosition();
});