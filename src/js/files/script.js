// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.documentElement.classList.add("loading")
window.onload = () => {
    document.documentElement.classList.contains("loading") ? document.documentElement.classList.remove("loading") : null;
    const headerHeight = document.querySelector("header").offsetHeight;
    document.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (headerHeight / 2 < scrollTop) document.querySelector(".guests-categories").classList.add("scrolled");
    });

    const currentPath = location.pathname.replace('.html', '').replace('/', '');
    const prev = document.querySelector('.header-pages__prev')
    if (currentPath != '' && prev) {
        let path = `<a href="/" class="header-pages__main">Главная</a>`

        path += `<a href="/categories.html" class="header-pages__main">Категории</a>`
        if (currentPath != 'categories')
            path += `<a href="/${currentPath}.html" class="header-pages__main">${currentPath.toUpperCase()}</a>`
        prev.innerHTML = path

    }


}