document.addEventListener('DOMContentLoaded', function() {
    const favoritesSection = document.getElementById('favorites');
    const favoritesList = document.getElementById('favorites-list');
    const cartCountSpan = document.getElementById('cart-count'); 
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>You have no favorite items yet.</p>';
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';

            const productImage = document.createElement('img'); 
            productImage.src = item.image;
            productImage.className = 'cart-item-image';

            const productName = document.createElement('span'); 
            productName.textContent = item.name;

            const productPrice = document.createElement('span');
            productPrice.textContent = `$${item.price.toFixed(2)}`; 

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
                favorites.splice(index, 1); 
                localStorage.setItem('favorites', JSON.stringify(favorites)); 
                renderFavorites(); 
                updateCartCount(); 
            });

            listItem.appendChild(productImage);
            listItem.appendChild(productName);
            listItem.appendChild(productPrice);
            listItem.appendChild(removeButton);

            favoritesList.appendChild(listItem);
        });
    }

    function renderFavorites() {
        favoritesList.innerHTML = ''; 
        if (favorites.length === 0) {
            favoritesSection.innerHTML = '<p>You have no favorite items yet.</p>';
        } else {
            favorites.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'cart-item';

                const productImage = document.createElement('img'); 
                productImage.src = item.image;
                productImage.className = 'cart-item-image';

                const productName = document.createElement('span'); 
                productName.textContent = item.name;

                const productPrice = document.createElement('span');
                productPrice.textContent = `$${item.price.toFixed(2)}`; 

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-button';
                removeButton.addEventListener('click', () => {
                    favorites.splice(index, 1); 
                    localStorage.setItem('favorites', JSON.stringify(favorites)); 
                    renderFavorites(); 
                    updateCartCount(); 
                });

                listItem.appendChild(productImage);
                listItem.appendChild(productName);
                listItem.appendChild(productPrice);
                listItem.appendChild(removeButton);

                favoritesList.appendChild(listItem);
            });
        }
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }

    updateCartCount(); 
});
