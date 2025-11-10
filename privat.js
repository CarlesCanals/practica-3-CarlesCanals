// Nom de la clau que ja fèiem servir al login
const AUTH_KEY = "usuariAutenticat";

/**
 * Retorna l'usuari autenticat llegint de localStorage,
 * o null si no n'hi ha cap.
 */
function obtenirUsuariAutenticat() {
    const dades = localStorage.getItem(AUTH_KEY);
    if (!dades) return null;
    try {
        return JSON.parse(dades);
    } catch (e) {
        console.error("Error parsejant l'usuari autenticat:", e);
        return null;
    }
}

/**
 * Funció de logout:
 * - Esborra l'estat d'autenticació
 * - Redirigeix a la pàgina de login
 */
function logout() {
    // Si prefereixes sessionStorage, canvia aquesta línia
    localStorage.removeItem(AUTH_KEY);

    // Redirigir a la pàgina de login (o la que vulguis)
    window.location.href = "login.html";
}

// Quan la pàgina privada es carrega:
document.addEventListener("DOMContentLoaded", () => {
    const usuari = obtenirUsuariAutenticat();

    // ✅ Criteri: l'usuari no pot accedir si no està autenticat
    if (!usuari) {
        window.location.href = "login.html";
        return;
    }

    // Mostrar alguna info de l'usuari (opcional)
    const info = document.getElementById("user-info");
    if (info && usuari.email) {
        info.textContent = `Has iniciat sessió com: ${usuari.email}`;
    }

    // ✅ Hi ha botó "Tanca sessió" visible i funcional
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (event) => {
            event.preventDefault();
            logout();
        });
    }
});
