// Adding items to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const button = e.target;

        const item = {
            image: button.closest('.shopcard').querySelector('img').src, // Get image src
            name: button.closest('.shopcard').querySelector('p').textContent, // Get item name
            price: button.closest('.shopcard').querySelector('.price').textContent, // Get price
        };

        // Get the current cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new item to the cart
        cartItems.push(item);

        // Save the updated cart items back to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert('Item added to cart!');
    });
});


// Display cart items
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.querySelector('.cart-container');

if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty!</p>';
} else {
    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        if (item.image && item.name && item.price) {
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">₹${item.price}</p>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
        } else {
            console.error('Cart item is missing required data:', item);
        }

        // Add event listener to the delete button
        const deleteButton = cartItemElement.querySelector('.delete-item');
        deleteButton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteItem(index);
        });

        // Append the cart item element to the cart container
        cartContainer.appendChild(cartItemElement);
    });
}

// Function to delete an item from the cart
function deleteItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    location.reload(); // Reload the page to reflect the updated cart
}



document.querySelectorAll('.image-container').forEach(container => {
  container.addEventListener('touchstart', () => {
    const defaultImg = container.querySelector('.default');
    const hoverImg = container.querySelector('.hover-img');

    // Show hover image and hide default on touch
    defaultImg.style.opacity = '0';
    hoverImg.style.opacity = '1';

    // Optional: Revert after 1 second
    setTimeout(() => {
      defaultImg.style.opacity = '1';
      hoverImg.style.opacity = '0';
    }, 1000); // Change the duration as needed
  });



});

