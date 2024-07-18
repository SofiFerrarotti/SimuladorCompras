document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
        });
    displayCartCount();
});

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-sm-6 product-item';
        productElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart({ id: ${product.id}, name: '${product.name}', price: ${product.price}, quantity: 1 })">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
};

const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartCount();
};

const displayCartCount = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
};

const calcularCuotas = (total, cuotas) => {
    if (cuotas === 1) {
        return total; 
    } else {
        const tasa = 0.05; 
        const montoCuota = (total * tasa) / (1 - Math.pow(1 + tasa, -cuotas));
        return montoCuota;
    }
};

const completarCompra = () => {
    const cuotas = parseInt(document.getElementById('fees').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const montoCuota = calcularCuotas(total, cuotas);

    let mensajeCuotas = (cuotas === 1) ? `Total a pagar: $${total.toFixed(2)}` : `Total en ${cuotas} cuotas: $${montoCuota.toFixed(2)} por cuota`;

    Swal.fire({
        title: '¿Deseas completar la compra?',
        text: mensajeCuotas,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Compra realizada', '', 'success');
            localStorage.removeItem('cart');
            displayCartCount();
            displayCart();
        }
    });
};
