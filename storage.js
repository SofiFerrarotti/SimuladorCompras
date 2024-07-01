const displayCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach((product, index) => {
        let productItem = document.createElement('div');
        productItem.className = 'cart-item';
        productItem.innerHTML = `
            <span>${product.name} - ${product.quantity}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(productItem);
    });
};

const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    displayCartCount();
};
