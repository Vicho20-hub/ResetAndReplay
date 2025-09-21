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
    window.location.href = '../principal/main.html';
    // Esto funciona si lScript.js está en la carpeta Login y principal está al mismo nivel.
    // Esto último es para redirigir a la página principal. Se debe cambiar la ruta según sea necesario.
    // Si llegase a dar error por no encontrar el archivo, asegurarse de estar usando "/" en lugar de "\" para separar las carpetas.

});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        alert('Por favor ingresa tu fecha de nacimiento.');
        return;
    }
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (age < 18) {
        alert('Debes ser mayor de 18 años para registrarte.');
        return;
    }
    // Aquí puedes continuar con el registro (guardar datos, redirigir, etc.)
    alert('Registro exitoso. ¡Bienvenido!');
    // window.location.href = '../principal/main.html'; // Si quieres redirigir después del registro
});
