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

  // Modal actions
  document.getElementById('modal-add').addEventListener('click', () => {
    cartCount++;
    cartBtn.textContent = `Carrito (${cartCount})`;
    closeModal();
  });

  document.getElementById('modal-buy').addEventListener('click', () => {
    alert('Simulación de compra: ir a checkout (a implementar).');
    closeModal();
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
