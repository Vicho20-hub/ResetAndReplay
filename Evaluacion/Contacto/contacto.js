// Contact form
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    formResponse.textContent = "¡Gracias por tu mensaje, " + name + "! Lo hemos recibido correctamente.";
    formResponse.style.color = "var(--accent-1)";
    contactForm.reset();
  } else {
    formResponse.textContent = "Por favor, completa todos los campos.";
    formResponse.style.color = "var(--accent-3)";
  }
});
