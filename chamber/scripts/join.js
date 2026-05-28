const timestamp = document.querySelector('#timestamp');
if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}

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
