// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { Vote } from './Vote.js'

document.documentElement.classList.add("loading")
window.onload = () => {
    document.documentElement.classList.contains("loading") ? document.documentElement.classList.remove("loading") : null;
    const headerHeight = document.querySelector("header").offsetHeight;
    document.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (headerHeight / 2 < scrollTop) document.querySelector(".guests-categories").classList.add("scrolled");
    });

    const vote = new Vote(document.querySelector('[data-vote]'))
    vote.init()
}