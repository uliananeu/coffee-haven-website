document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty. Start shopping!</p>';
    } else {
        const itemList = document.createElement('ul');

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';

            const itemImage = document.createElement('img'); 
            itemImage.src = item.image; 
            itemImage.className = 'cart-item-image';

            const itemName = document.createElement('span'); 
            itemName.textContent = item.name; 

            const itemQuantity = document.createElement('input'); 
            itemQuantity.type = 'number'; 
            itemQuantity.value = item.quantity; 
            itemQuantity.min = 1; 

            itemQuantity.addEventListener('change', function() {
                item.quantity = parseInt(this.value, 10); 
                localStorage.setItem('cart', JSON.stringify(cart)); 
            });

            const itemPrice = document.createElement('span'); 
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`; 

            const removeButton = document.createElement('button'); 
            removeButton.textContent = 'Remove'; 
            removeButton.className = 'remove-item'; 
            removeButton.dataset.index = index; 

            listItem.appendChild(itemImage);
            listItem.appendChild(itemName);
            listItem.appendChild(itemQuantity);
            listItem.appendChild(itemPrice);
            listItem.appendChild(removeButton);

            itemList.appendChild(listItem); 
        });

        cartItems.appendChild(itemList);

        const removeButtons = document.querySelectorAll('.remove-item'); 
        removeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const index = parseInt(e.target.dataset.index, 10);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                
                const itemList = document.querySelector('#cart-items ul');
                itemList.removeChild(itemList.childNodes[index]);
            });
        });
    }

    const favoritesIcon = document.createElement('i');
    favoritesIcon.className = 'fas fa-heart go-to-favorites';

    favoritesIcon.addEventListener('click', function() {
        window.location.href = 'favorites.html';
    });

    const mainContent = document.querySelector('.main-content');
    mainContent.appendChild(favoritesIcon);
});

