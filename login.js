// login.js

const loginForm = document.getElementById("login-form");
const errorBox = document.getElementById("login-error");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el reload de la pàgina

    // 1. Llegir valors del formulari
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    // 2. Validació bàsica al client
    if (!email || !password) {
        mostrarError("Has d'omplir tots els camps.");
        return;
    }

    try {
        // 3. Carregar l'arxiu JSON amb els usuaris
        const resposta = await fetch("users.json");

        if (!resposta.ok) {
            throw new Error("No s'ha pogut carregar la llista d'usuaris.");
        }

        const usuaris = await resposta.json();

        // 4. Buscar usuari amb email i contrasenya coincidents
        const usuariTrobat = usuaris.find(
            (u) => u.email === email && u.password === password
        );

        if (!usuariTrobat) {
            // Credencials incorrectes
            mostrarError("Correu o contrasenya incorrectes.");
            return;
        }

        // 5. Si el login és correcte, marquem l'usuari com a autenticat
        const authData = {
            email: usuariTrobat.email,
            role: usuariTrobat.role || "user",
            loggedInAt: new Date().toISOString()
        };

        localStorage.setItem("usuariAutenticat", JSON.stringify(authData));

        // 6. Podem redirigir a una pàgina privada o mostrar un missatge
        // Exemple: redirigir a "privat.html"
        window.location.href = "privat.html";
        // Si no tens pàgina privada encara, pots substituir per:
        // alert("Sessió iniciada correctament!");

    } catch (error) {
        console.error(error);
        mostrarError("S'ha produït un error en iniciar sessió. Torna-ho a provar més tard.");
    }
});

/**
 * Mostra un missatge d'error sota el formulari
 * @param {string} missatge
 */
function mostrarError(missatge) {
    errorBox.textContent = missatge;
}
