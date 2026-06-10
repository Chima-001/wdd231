const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
const themeBtn = document.querySelector('#theme-btn');

if (navButton && navBar) {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}

const year = document.querySelector('#copyright-year');
if (year) year.textContent = new Date().getFullYear();

const lastMod = document.querySelector('#lastModified');
if (lastMod) lastMod.textContent = `Last Modified: ${document.lastModified}`;

if (themeBtn) {
    const icon = themeBtn.querySelector('img');
    if (localStorage.getItem('atlas-theme') === 'light') {
        document.body.classList.add('light');
        icon.src = 'images/dark-mode.svg';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        icon.src = isLight ? 'images/dark-mode.svg' : 'images/dark-mode.svg';
        localStorage.setItem('atlas-theme', isLight ? 'light' : 'dark');
    });
}