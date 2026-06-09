const timestamp = document.querySelector('#timestamp');

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

if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}

observeCards('.membership-card');

const learnMoreBtns = document.querySelectorAll('.learn-more');
const closeModalBtns = document.querySelectorAll('.close-modal');
learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal');
        const modal = document.querySelector(`#${modalId}`);
        if (modal) modal.showModal();
    });
});
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('dialog');
        if (modal) modal.close();
    });
});
