let serviciosContratados = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para verificar si todos los campos del formulario están completos
function verificarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '' || email === '' || mensaje === '') {
        console.log('Por favor, completa todos los campos del formulario.');
    } else {
        console.log('Formulario enviado correctamente.');
        document.getElementById('formulario').submit();
    }
}

// Función para agregar un servicio al carrito
function agregarAlCarrito(servicio) {
    const existingService = serviciosContratados.find(item => item.nombre === servicio.nombre);
    
    if (existingService) {
        existingService.cantidad += 1;
    } else {
        servicio.cantidad = 1;
        serviciosContratados.push(servicio);
    }

    localStorage.setItem('carrito', JSON.stringify(serviciosContratados));
    actualizarContador();
    mostrarCarrito(); // Mostrar el carrito después de agregar un servicio
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    const listaCarritoDiv = document.getElementById('lista-carrito');
    
    listaCarritoDiv.innerHTML = ''; // Limpiar la lista antes de mostrar

    if (serviciosContratados.length > 0) {
        serviciosContratados.forEach(item => {
            const cantidad = item.cantidad || 0; // Asignar 0 si cantidad es undefined
            if (cantidad > 0) { // Solo mostrar si la cantidad es mayor que 0
                const itemDiv = document.createElement('div');
                itemDiv.className = 'card-item'; // Agregar clase para estilo
                itemDiv.innerHTML = `
                    <span>${item.nombre} - Cantidad: 
                        <input type="number" value="${cantidad}" min="1" onchange="editarCantidad('${item.nombre}', this.value)">
                    </span>
                    <button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
                    <button onclick="actualizarCarrito()">Actualizar</button>
                `;
                listaCarritoDiv.appendChild(itemDiv);
            }
        });
        carritoDiv.style.display = 'block'; // Mostrar el carrito si hay elementos
    } else {
        carritoDiv.style.display = 'none'; // Ocultar el carrito si no hay elementos
        alert('No hay nada contratado.'); // Alerta si el carrito está vacío
    }
}

// Función para ocultar el carrito
function ocultarCarrito() {
    document.getElementById('carrito').style.display = 'none';
}

// Función para editar la cantidad de un servicio en el carrito
function editarCantidad(nombreServicio, nuevaCantidad) {
    const servicio = serviciosContratados.find(item => item.nombre === nombreServicio);
    if (servicio) {
        servicio.cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(serviciosContratados));
        actualizarContador();
        mostrarCarrito(); // Refrescar el carrito después de editar la cantidad
    }
}

// Función para eliminar un servicio del carrito
function eliminarDelCarrito(nombreServicio) {
    serviciosContratados = serviciosContratados.filter(item => item.nombre !== nombreServicio);
    localStorage.setItem('carrito', JSON.stringify(serviciosContratados));
    actualizarContador();
    mostrarCarrito(); // Refrescar el carrito después de eliminar un servicio
}

// Función para actualizar el contador del carrito
function actualizarContador() {
    const totalItems = serviciosContratados.reduce((acc, item) => {
        const cantidad = Number(item.cantidad);
        return acc + (isNaN(cantidad) ? 0 : cantidad);
    }, 0);
    
    document.getElementById('contador-carrito').innerText = totalItems;
}

// Función para generar dinámicamente la lista de productos disponibles
function generarListaProductos() {
    const productos = [
        { nombre: 'DJ para Bodas', descripcion: 'El mejor ambiente para tu gran día.' },
        { nombre: 'DJ para Fiestas', descripcion: 'Fiestas inolvidables con la mejor música.' },
        { nombre: 'DJ para Eventos Corporativos', descripcion: 'Profesionalismo y diversión asegurados.' },
    ];

    console.log('Lista de productos disponibles:');
    productos.forEach(producto => {
        console.log(`Nombre: ${producto.nombre}, Descripción: ${producto.descripcion}`);
    });
}

// Al cargar la página, solo actualizar el contador
window.onload = function() {
    actualizarContador();
    generarListaProductos();
};

// Añadir el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', verificarFormulario);
