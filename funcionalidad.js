/* 
Funcionalidad:
Seleccionar el producto a comprar de la lista
Seleccionar la cantidad de productos a comprar
Tener un descuento
Pagar con cuotas o sin cuotas
Mostrar el total a pagar
Mostrar el total a pagar con el descuento
Mostrar el total a pagar con el descuento y cuotas
*/ 
const productos = {
    teclado: { nombre: 'Teclado', precio: 30000 },
    mouse: { nombre: 'Mouse', precio: 5000 },
    monitor: { nombre: 'Monitor', precio: 150000 },
    cpu: { nombre: 'CPU', precio: 300000 }
};

let carrito = []; 
let total = 0; 
let pagoCuotas = 0; 

alert('Bienvenido, la lista de los productos es: teclado, mouse, monitor, cpu');

do {
    let producto = prompt('¿Qué producto deseas comprar?').toLowerCase(); 
    if (producto in productos) {
        let cantidad = parseInt(prompt(`¿Cuántos ${productos[producto].nombre} deseas comprar?`));
        if (!isNaN(cantidad) && cantidad > 0) {
            let descuento = prompt('¿Tienes cupón de descuento? (si/no)').toLowerCase();
            let descuentoPorcentaje = 0; 
            if (descuento === 'si') {
                descuentoPorcentaje = parseFloat(prompt('Ingresa el descuento en porcentaje (sin el signo %)'));
                if (!isNaN(descuentoPorcentaje)) {
                    productos[producto].precioConDescuento = productos[producto].precio * (1 - descuentoPorcentaje / 100);
                    alert(`Con el ${descuentoPorcentaje}% de descuento, tu ${productos[producto].nombre} queda en: $${productos[producto].precioConDescuento.toFixed(2)} por unidad.`);
                } else {
                    alert('Por favor, ingresa un valor numérico válido para el descuento.');
                    continue;
                }
            }
            carrito.push({ producto: productos[producto].nombre, cantidad: cantidad, precioUnitario: productos[producto].precio });
            total += productos[producto].precio * cantidad * (1 - (descuentoPorcentaje / 100));
        } else {
            alert('Por favor, ingresa una cantidad válida.');
            continue;
        }
    } else {
        alert('No tenemos ese producto');
        continue;
    }
} while (confirm('¿Quieres seguir comprando?'));


let pago = prompt('¿Desea pagar en cuotas? (si/no)').toLowerCase();
if (pago === 'si') {
    pagoCuotas = parseInt(prompt('Ingresa la cantidad de cuotas'));
    if (isNaN(pagoCuotas) || pagoCuotas <= 0) {
        alert('Por favor, ingresa una cantidad de cuotas válida.');
    }
}

let detalleCompra = 'Detalle de la compra:\n';
carrito.forEach(item => {
    detalleCompra += `${item.cantidad} ${item.producto}: $${(item.precioUnitario * item.cantidad).toFixed(2)}\n`;
});
detalleCompra += `Total: $${total.toFixed(2)}\n`;
if (pagoCuotas > 0) {
    detalleCompra += `Pagado en ${pagoCuotas} cuotas.`;
}

alert(detalleCompra);