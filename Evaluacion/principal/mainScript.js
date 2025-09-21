// Data-driven modal + search + sort + carrito simple
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const productsGrid = document.getElementById('products-grid');
  const searchInput = document.getElementById('search');
  const sortSelect = document.getElementById('sort');
  const cartBtn = document.getElementById('cart-btn');

  let cartCount = 0;

  // Open modal with data from card
  function openModalFromCard(card) {
    const title = card.dataset.title;
    const price = card.dataset.price;
    const desc = card.dataset.desc;
    const img = card.dataset.image;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalPrice.textContent = `$${parseFloat(price).toFixed(2)}`;
    modalImg.src = img;
    modalImg.alt = title;

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }

  // Close modal
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegate view buttons
  productsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    if (e.target.matches('.view-btn')) {
      openModalFromCard(card);
    } else if (e.target.matches('.add-cart') || e.target.matches('.btn.outline.add-cart')) {
      cartCount++;
      cartBtn.textContent = `Carrito (${cartCount})`;
      // pequeña animación
      cartBtn.animate([{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 150 });
    }
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });



// Array global para guardar items
let cartItems = [];

// Función para añadir producto al carrito
function addToCart(card) {
  const item = {
    id: card.dataset.id,
    title: card.dataset.title,
    price: parseFloat(card.dataset.price)
  };
  cartItems.push(item);
  updateCartUI();
}

// Actualizar contador y total del carrito
function updateCartUI() {
  cartBtn.textContent = `Carrito (${cartItems.length})`;
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cartItems.forEach(item => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `<span>${item.title}</span><span>$${item.price.toFixed(2)}</span>`;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Evento click en botón de carrito
cartBtn.addEventListener('click', () => {
  const cartModal = document.getElementById('cart-modal');
  cartModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});

// Cerrar modal carrito
const cartModal = document.getElementById('cart-modal');
const cartClose = document.getElementById('cart-close');
cartClose.addEventListener('click', () => {
  cartModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});
cartModal.querySelector('.modal-backdrop').addEventListener('click', () => {
  cartModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});

// Cambiar función de añadir al carrito existente
productsGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;

  if (e.target.matches('.view-btn')) {
    openModalFromCard(card);
  } else if (e.target.matches('.add-cart') || e.target.matches('.btn.outline.add-cart')) {
    addToCart(card); // ahora usamos la nueva función
  }
});

// Modal: comprar desde modal también agrega al carrito
document.getElementById('modal-add').addEventListener('click', () => {
  const productCard = Array.from(document.querySelectorAll('.product-card'))
    .find(c => c.dataset.title === modalTitle.textContent);
  if (productCard) addToCart(productCard);
  closeModal();
});

// Nueva función para renderizar carrito con botón eliminar
function updateCartUI() {
  cartBtn.textContent = `Carrito (${cartItems.length})`;
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.title}</span>
      <span>
        $${item.price.toFixed(2)}
        <button class="remove-btn" data-index="${index}">✕</button>
      </span>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  // Agregar funcionalidad a botones eliminar
  cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      cartItems.splice(idx, 1);
      updateCartUI();
    });
  });
}

// Checkout
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
  window.location.href = "checkout.html"; // redirige a otra página (a implementar)
});




  // Search filter (simple)
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const desc = card.dataset.desc.toLowerCase();
      card.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  });

  // Sort (client-side by data-price)
  sortSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const cards = Array.from(document.querySelectorAll('.product-card'));
    let sorted = cards;

    if (val === 'price-asc') {
      sorted = cards.sort((a,b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (val === 'price-desc') {
      sorted = cards.sort((a,b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } else {
      // featured: keep original order — do nothing
      sorted = cards.sort((a,b) => parseInt(a.dataset.id) - parseInt(b.dataset.id));
    }

    // Re-append in new order
    sorted.forEach(c => productsGrid.appendChild(c));
  });

  // Accessibility: trap focus inside modal when open (simple approach)
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable[focusable.length -1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

});
