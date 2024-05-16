document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

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
            alert(`${productData.name} has been added to your cart!`);
        });
    });

    const wishlistButtons = document.querySelectorAll('.wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleWishlist(button);
        });
    });
});

function toggleWishlist(button) {
    const productData = JSON.parse(button.dataset.product);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const existingProductIndex = favorites.findIndex(item => item.name === productData.name);

    if (existingProductIndex === -1) {
        favorites.push(productData);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i>';
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
