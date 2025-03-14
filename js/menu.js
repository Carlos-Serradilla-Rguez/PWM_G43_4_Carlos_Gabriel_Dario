function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

// Cerrar el menú si el usuario hace clic fuera
document.addEventListener("click", function(event) {
    let menu = document.getElementById("menu");
    let button = document.querySelector(".bubble-button");

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("show");
    }
});
