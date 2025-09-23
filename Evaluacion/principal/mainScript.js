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

  // Carrito como lista de objetos con qty
  let cartItems = []; // { id, title, price, qty }

  // ---- Helpers ----
  function findCartIndexById(id){
    return cartItems.findIndex(it => it.id === id);
  }

  function formatPrice(v){
    return `$${parseFloat(v).toFixed(2)}`;
  }

  // ---- Añadir al carrito (agrega qty si ya existe) ----
  function addToCart(card, qty = 1) {
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseFloat(card.dataset.price);

    const idx = findCartIndexById(id);
    if (idx >= 0) {
      cartItems[idx].qty += qty;
    } else {
      cartItems.push({ id, title, price, qty });
    }

    // UI updates
    updateCartUI();
    animateCartBtn();
    showAddToast(`${title} agregado${qty > 1 ? ` x${qty}` : ''}`);
  }

  // ---- Animar botón del carrito ----
  function animateCartBtn(){
    cartBtn.classList.remove('bump');
    // reflow to restart animation
    void cartBtn.offsetWidth;
    cartBtn.classList.add('bump');
  }

  // ---- Toast pequeño que aparece al agregar ----
  function showAddToast(text){
    const toast = document.createElement('div');
    toast.className = 'add-toast';
    toast.textContent = text;
    document.body.appendChild(toast);

    // show
    requestAnimationFrame(() => toast.classList.add('show'));

    // hide después de 1.6s y remover
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      toast.addEventListener('animationend', () => toast.remove());
    }, 1600);
  }

  // ---- Renderizar carrito (agrupa por qty) ----
  function updateCartUI(){
    cartBtn.textContent = `Carrito (${cartItems.reduce((s,i)=>s+i.qty,0)})`;
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cartItems.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement('div');
      div.classList.add('cart-item');

      div.innerHTML = `
        <div class="left">
          <div>
            <div class="title">${item.title}</div>
            <div style="font-size:11px;color:#777;">${formatPrice(item.price)} c/u</div>
          </div>
        </div>

        <div class="item-controls">
          <div class="qty-badge" data-index="${index}">${item.qty}</div>
          <button class="decr-btn" data-index="${index}" title="Quitar 1">-</button>
          <button class="incr-btn" data-index="${index}" title="Agregar 1">+</button>
          <button class="remove-btn" data-index="${index}" title="Eliminar">✕</button>
        </div>
      `;

      cartItemsContainer.appendChild(div);
    });

    cartTotal.innerHTML = `<strong>Total: ${formatPrice(total)}</strong>`;

    // Delegación de eventos para botones dentro del contenedor
    cartItemsContainer.querySelectorAll('.decr-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        if (cartItems[idx].qty > 1) {
          cartItems[idx].qty -= 1;
        } else {
          // si llega a 0, removemos
          cartItems.splice(idx,1);
        }
        updateCartUI();
      });
    });

    cartItemsContainer.querySelectorAll('.incr-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        cartItems[idx].qty += 1;
        updateCartUI();
        animateCartBtn();
      });
    });

    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        cartItems.splice(idx,1);
        updateCartUI();
      });
    });
  }

  // ---- Abrir modal desde tarjeta ----
  function openModalFromCard(card) {
    const title = card.dataset.title;
    const price = card.dataset.price;
    const desc = card.dataset.desc;
    const img = card.dataset.image;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalPrice.textContent = formatPrice(price);
    modalImg.src = img;
    modalImg.alt = title;

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ---- Events: productos (delegación) ----
  productsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    if (e.target.matches('.view-btn')) {
      openModalFromCard(card);
    } else if (e.target.matches('.add-cart') || e.target.matches('.btn.outline.add-cart')) {
      addToCart(card, 1);
    }
  });

  // Modal close
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Modal actions (añadir desde modal)
  document.getElementById('modal-add').addEventListener('click', () => {
    // encontrar tarjeta por título (asume títulos únicos)
    const productCard = Array.from(document.querySelectorAll('.product-card'))
      .find(c => c.dataset.title === modalTitle.textContent);
    if (productCard) addToCart(productCard, 1);
    closeModal();
  });

  document.getElementById('modal-buy').addEventListener('click', () => {
    alert('Simulación de compra: ir a checkout (a implementar).');
    closeModal();
  });

  // ---- Carrito: abrir / cerrar modal ----
  const cartModal = document.getElementById('cart-modal');
  const cartClose = document.getElementById('cart-close');
  cartBtn.addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // renderizar para asegurar que esté actualizado al abrir
    updateCartUI();
  });
  cartClose.addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
  cartModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    // podrías serializar carrito a localStorage o pasar por query string; por ahora redirigimos
    window.location.href = "checkout.html";
  });

  // Search filter
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const desc = card.dataset.desc.toLowerCase();
      card.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const cards = Array.from(document.querySelectorAll('.product-card'));
    let sorted = cards;

    if (val === 'price-asc') {
      sorted = cards.sort((a,b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (val === 'price-desc') {
      sorted = cards.sort((a,b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } else {
      sorted = cards.sort((a,b) => parseInt(a.dataset.id) - parseInt(b.dataset.id));
    }
    sorted.forEach(c => productsGrid.appendChild(c));
  });

  // Accessibility: trap focus inside modal (product modal)
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable[focusable.length -1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

});
