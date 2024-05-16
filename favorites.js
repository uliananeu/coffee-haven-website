document.addEventListener('DOMContentLoaded', function() {
    const favoritesSection = document.getElementById('favorites');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>You have no favorite items yet.</p>';
    } else {
        const itemList = document.createElement('ul');

        favorites.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';

            const productImage = document.createElement('img'); 
            productImage.src = item.image;
            productImage.className = 'cart-item-image';

            const productName = document.createElement('span'); 
            productName.textContent = item.name;

            const productPrice = document.createElement('span');
            productPrice.textContent = `$${item.price}`;
            productPrice.className = 'product-price';

            listItem.appendChild(productImage);
            listItem.appendChild(productName);
            listItem.appendChild(productPrice);

            itemList.appendChild(listItem);
        });

        favoritesSection.appendChild(itemList);
    }
});
