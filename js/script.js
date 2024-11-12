// Array para almacenar productos en el carrito, cargado desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCounter = document.getElementById("cartCounter");
    cartCounter.textContent = cart.length;
    cartCounter.style.display = cart.length > 0 ? "inline-block" : "none"; // Mostrar solo si hay productos
}

// Agregar productos al carrito
function addToCart(productImage, productName, productPrice) {
    const product = { image: productImage, name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartPreview();
    updateCartCounter();

    // Mostrar la alerta de éxito
    showAlert("Agregado al carrito con éxito", "success");
}

// Vista previa de imagen en botón de carrito
function updateCartPreview() {
    const cartPreviewImg = document.getElementById("cartImgPreviewImg");
    cartPreviewImg.src = cart.length > 0 ? cart[cart.length - 1].image : '';
    document.getElementById("cartImgPreview").style.display = cart.length > 0 ? "block" : "none";
    updateCartPanel();
}

// Mostrar productos en la vista previa del carrito
function updateCartPanel() {
    const cartItemsPreview = document.getElementById("cartItemsPreview");
    cartItemsPreview.innerHTML = "";
    cart.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex align-items-center justify-content-between";
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${product.image}" style="width: 50px; margin-right: 10px;">
                <div><p>${product.name}</p><p style="color: #7CFC00;">$${product.price}</p></div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index}, this)">X</button>
        `;
        cartItemsPreview.appendChild(listItem);
    });
}

// Eliminar producto del carrito y actualizar vista previa
function removeFromCart(index, buttonElement) {
    // Remover del array de carrito y de localStorage
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();

    // Si estamos en carrito_compras.html, eliminar el elemento del DOM inmediatamente
    const cartContainer = document.getElementById("cartItems");
    if (cartContainer) {
        // Eliminar visualmente el producto específico en carrito_compras.html
        const productCard = buttonElement.closest(".col-md-4"); // Encuentra el contenedor de producto
        if (productCard) productCard.remove(); // Elimina el contenedor específico del producto
        if (cart.length === 0) cartContainer.innerHTML = "<p class='text-center text-muted'>Agrega productos para completar tu compra.</p>"; // Mostrar mensaje si está vacío
    } else {
        updateCartPreview();
        updateCartPanel();
    }

    // Mostrar la alerta de éxito al eliminar
    showAlert("Eliminado con éxito", "error");
}

// Alternar visibilidad del panel de vista previa del carrito
function toggleCartPreview() {
    document.getElementById("cartPreviewPanel").classList.toggle("show");
}

// Cargar productos en carrito_compras.html
function loadCartItems() {
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = cart.length ? cart.map((product, index) => `
        <div class="col-md-4 mb-4">
            <div class="card position-relative">
                <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" onclick="removeFromCart(${index}, this)">X</button>
                <img src="${product.image}" class="card-img-top" style="height: 250px;">
                <div class="card-body text-dark">
                    <p>${product.name}</p>
                    <p class="text-success">$${product.price}</p>
                </div>
            </div>
        </div>
    `).join('') : "<p class='text-center text-muted'>Agrega productos para completar tu compra..</p>";
}

// Inicializar eventos y cargar carrito
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cartItems")) loadCartItems();
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.img, button.dataset.name, 30.000);
        });
    });
    document.getElementById("closeCartPreview").addEventListener("click", toggleCartPreview);
    updateCartPreview();
    updateCartCounter(); // Actualizar el contador al cargar la página
});

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si el botón de hamburguesa existe en la página
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarSupportedContent');
            if (navbarCollapse) {
                navbarCollapse.classList.toggle('show'); // Alternar visibilidad del menú
            }
        });
    }
});

// Función para mostrar una alerta animada con chispas
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    alertBox.innerHTML = `<span>${message}</span>`;

    // Añadir chispas alrededor del mensaje
    for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        alertBox.appendChild(spark);
    }

    // Añadir el elemento de alerta al cuerpo
    document.body.appendChild(alertBox);

    // Remover el mensaje después de un tiempo
    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => {
            alertBox.remove();
        }, 500);
    }, 2000);
}
//funcion comprar producto
function goToCheckout() {
    window.location.href = 'carrito_compras.html#checkoutForm';
}
document.addEventListener("DOMContentLoaded", function() {
    const completeBtn = document.getElementById('complete-btn');
    const welcomeMessage = document.getElementById('welcome-message');
    const formContainer = document.getElementById('form-container');
    const productImagesContainer = document.getElementById('product-images');

    // Simulación de productos en el carrito (esto puedes obtenerlo dinámicamente)
    const productsInCart = [
        { name: 'Producto 1', image: 'https://via.placeholder.com/60' },
        { name: 'Producto 2', image: 'https://via.placeholder.com/60' }
    ];

    completeBtn.addEventListener('click', function() {
        // Mostrar el mensaje y las imágenes de los productos
        welcomeMessage.style.display = 'block';
        formContainer.style.display = 'block';

        // Mostrar las imágenes de los productos en el carrito
        productsInCart.forEach(product => {
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.classList.add('img-thumbnail');  // Agrega una clase de Bootstrap para mejorar el estilo
            productImagesContainer.appendChild(img);
        });

        // Ocultar el botón de "Completar Compra" una vez clickeado
        completeBtn.style.display = 'none';
    });
});
// script.js

document.addEventListener("DOMContentLoaded", function() {
    const completePurchaseBtn = document.getElementById("completePurchaseBtn");
    const purchaseFormModal = document.getElementById("purchaseFormModal");
    const closeFormBtn = document.getElementById("closeFormBtn");

    // Abre el formulario al hacer clic en "Completar Compra"
    completePurchaseBtn.addEventListener("click", function() {
        purchaseFormModal.classList.add("show");
    });

    // Cierra el formulario al hacer clic en "Cancelar"
    closeFormBtn.addEventListener("click", function() {
        purchaseFormModal.classList.remove("show");
    });
});
// Lista de departamentos y sus ciudades
const departments = {
    antioquia: ["Medellín", "Rionegro", "Envigado"],
    bogota: ["Bogotá"],
    atlántico: ["Barranquilla", "Soledad", "Malambo"],
    // Agregar los demás departamentos y sus ciudades
  };
  
  // Evento para actualizar las ciudades según el departamento seleccionado
  document.getElementById("department").addEventListener("change", function() {
    const department = this.value;
    const citySelect = document.getElementById("city");
  
    // Limpiar las opciones de la ciudad
    citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
  
    // Si hay ciudades para el departamento seleccionado, añadirlas al select
    if (department && departments[department]) {
      departments[department].forEach(function(city) {
        const option = document.createElement("option");
        option.value = city.toLowerCase();
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });
// Abre el modal al hacer clic en el botón "Completar Compra"
document.getElementById("completePurchaseBtn").addEventListener("click", function() {
    const myModal = new bootstrap.Modal(document.getElementById('completePurchaseModal'));
    myModal.show();
});
function updateCartCounter() {
    const cartCounter = document.getElementById("cartCounter");
    const buyButton = document.getElementById("buyButton"); // Botón de "Comprar"
    const viewCartBtn = document.getElementById("viewCartBtn"); // Botón de "Ver carrito completo"

    // Actualiza el contador del carrito
    if (cartCounter) {
        cartCounter.textContent = cart.length;
        cartCounter.style.display = cart.length > 0 ? "inline-block" : "none";
    }

    // Mostrar/ocultar los botones de compra según la cantidad de productos en el carrito
    if (cart.length === 0) {
        if (buyButton) buyButton.style.display = "none";
        if (viewCartBtn) viewCartBtn.style.display = "none";
    } else {
        if (buyButton) buyButton.style.display = "inline-block";
        if (viewCartBtn) viewCartBtn.style.display = "inline-block";
    }
}

// Llamar a updateCartCounter() al cargar la página para verificar el estado del carrito
document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    updateCartCounter();
});
