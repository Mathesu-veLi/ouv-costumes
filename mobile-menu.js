const hamb = document.querySelector(".hamb")
const navBar = document.querySelector(".nav-menu")

hamb.addEventListener("click", () => {
    hamb.classList.toggle("active")
    navBar.classList.toggle("active")
})