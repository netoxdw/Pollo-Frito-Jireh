let carrito = [];
let total = 0;

function agregarAlCarrito(producto, precio) {
    const item = carrito.find(item => item.producto === producto);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ producto, precio, cantidad: 1 });
    }

    actualizarCarrito();
    actualizarNotificacion();
    mostrarMensajeAgregado(); // Llama a la función para mostrar el mensaje
}

function mostrarMensajeAgregado() {
    const mensaje = document.createElement('div');
    mensaje.className = 'alert alert-success position-fixed bottom-0 end-2 m-3';
    mensaje.style.right = '70px';
    mensaje.style.zIndex = 1000;
    mensaje.textContent = 'Para continuar presiona sobre el carrito.';

    
    document.body.appendChild(mensaje);
    
    // Elimina el mensaje después de unos segundos
    setTimeout(() => {
        document.body.removeChild(mensaje);
    }, 3000);
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${item.producto} - $${item.precio} x ${item.cantidad}
            <div>
                <button class="btn btn-primary btn-sm me-2" onclick="incrementarCantidad(${index})">+</button>
                <button class="btn btn-danger btn-sm" onclick="restarCantidad(${index})">-</button>
            </div>
        `;

        listaCarrito.appendChild(li);
    });

    total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById('total').textContent = total;
}

function actualizarNotificacion() {
    const notificacion = document.getElementById('carrito-notificacion');
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    notificacion.textContent = totalProductos;
}

function incrementarCantidad(index) {
    carrito[index].cantidad++;
    actualizarCarrito();
    actualizarNotificacion();
}

function restarCantidad(index) {
    carrito[index].cantidad--;

    if (carrito[index].cantidad === 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
    actualizarNotificacion();

    if (carrito.length === 0) cerrarCarrito();
}

document.getElementById('carrito-icono').addEventListener('click', abrirCarrito);

function abrirCarrito() {
    document.getElementById('carrito-popup').style.display = 'block';
    document.getElementById('carrito-icono').style.display = 'none'; // Oculta el ícono del carrito
}

function cerrarCarrito() {
    document.getElementById('carrito-popup').style.display = 'none';
    document.getElementById('carrito-icono').style.display = 'flex'; // Muestra el ícono del carrito
}

function finalizarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega uno o más productos antes de finalizar el pedido.');
        return;
    }

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function enviarPedido() {
    let nombre = document.getElementById('nombre').value;
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    const tipoPedido = document.getElementById('tipoPedido').value;

    if (!nombre) {
        alert('Por favor ingresa tu nombre.');
        return;
    }

    let mensaje = `Hola, soy ${nombre}.\nMi pedido es para: ${tipoPedido}.\n\nProductos:\n`;
    carrito.forEach(item => {
        mensaje += `- ${item.producto} x${item.cantidad}: $${item.precio * item.cantidad}\n`;
    });
    mensaje += `\nTotal a pagar: $${total}`;

    const url = `https://api.whatsapp.com/send?phone=5215572116988&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
