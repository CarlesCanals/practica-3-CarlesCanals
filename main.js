// main.js
// Simulació de registre d'usuari amb validació i persistència local

const form = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

function validateEmail(email) {
    // Regex simple per validar correu
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function getUsers() {
    // Recupera usuaris del localStorage
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    messageDiv.textContent = '';
    messageDiv.className = '';

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Validació de camps
    if (!email || !password) {
        messageDiv.textContent = 'Tots els camps són obligatoris.';
        messageDiv.className = 'error';
        return;
    }
    if (!validateEmail(email)) {
        messageDiv.textContent = 'El format del correu no és vàlid.';
        messageDiv.className = 'error';
        return;
    }

    let users = getUsers();
    if (users.find(u => u.email === email)) {
        messageDiv.textContent = 'Aquest correu ja està registrat.';
        messageDiv.className = 'error';
        return;
    }

    users.push({ email, password });
    saveUsers(users);
    messageDiv.textContent = 'Registre completat correctament!';
    messageDiv.className = 'success';
    form.reset();
});

// Exportació a arxiu users.json (només simulació, no possible en frontend pur)
// Per exportar, pots afegir un botó i descarregar el JSON:
// function exportUsers() {
//     const users = getUsers();
//     const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'users.json';
//     link.click();
// }
