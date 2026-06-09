const timestamp = document.querySelector('#timestamp');
if (timestamp) timestamp.value = new Date().toLocaleString();

function observeCards(selector) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(`${selector}:not(.visible)`).forEach(card => {
        observer.observe(card);
    });
}
observeCards('.info-card');