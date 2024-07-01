const products = [
    { id: 1, name: 'Teclado', price: 100000 },
    { id: 2, name: 'Mouse', price: 30000 },
    { id: 3, name: 'Monitor', price: 300000 },
    { id: 4, name: 'CPU', price: 50000000 }
];

function addProductToCart(event) {
    event.preventDefault();

    let name = document.getElementById('firstName').value;
    let amount = parseInt(document.getElementById('amount').value);

    if (name && amount) {
        let product = {
            name: name,
            quantity: amount
        };
        addToCart(product);
    }
}

function toggleCart() {
    let cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
    displayCart();
}
