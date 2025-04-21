document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
});