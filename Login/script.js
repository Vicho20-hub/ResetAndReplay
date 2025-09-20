const flipCard = document.getElementById('flipCard');
    const registerText = document.getElementById('registerText');
    const loginText = document.getElementById('loginText');

    registerText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(180deg)';
    });

    loginText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(0deg)';
    });

// Nuevo Código para animación retro
document.getElementById('registerText').addEventListener('click', function() {
    const flipCard = document.getElementById('flipCard');
    flipCard.style.transform = 'rotateY(180deg)';
    flipCard.classList.add('retro-flip');
    setTimeout(() => {
        flipCard.classList.remove('retro-flip');
    }, 600); // Duración igual a la animación
});

document.getElementById('loginText').addEventListener('click', function() {
    const flipCard = document.getElementById('flipCard');
    flipCard.style.transform = 'rotateY(0deg)';
    flipCard.classList.add('retro-flip');
    setTimeout(() => {
        flipCard.classList.remove('retro-flip');
    }, 600);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío normal del formulario
    window.location.href = 'C:/Users/MOMO/OneDrive/Escritorio/Estudios/FullStack II/Evaluacion/main/main.html';
    // Esto último es para redirigir a la página principal. Se debe cambiar la ruta según sea necesario.
    // Si llegase a dar error por no encontrar el archivo, asegurarse de estar usando "/" en lugar de "\" para separar las carpetas.
});