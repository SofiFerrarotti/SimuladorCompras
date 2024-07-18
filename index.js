const addProductToCart = (event) => {
    event.preventDefault();

    let name = document.getElementById('firstName').value;
    let amount = parseInt(document.getElementById('amount').value);

    if (name && amount && amount > 0) {
        let product = {
            name: name,
            quantity: amount
        };
        addToCart(product);
        document.getElementById('firstName').value = '';
        document.getElementById('amount').value = '';
    } else {
        Swal.fire('Error', 'Por favor ingrese un nombre válido y una cantidad mayor a 0', 'error');
    }
};

document.getElementById('form').addEventListener('submit', addProductToCart);

function toggleCart() {
    let cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
    displayCart();
}
