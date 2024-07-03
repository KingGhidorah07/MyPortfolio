document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    menuToggle.addEventListener('click', function () {
        navbarMenu.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar-menu .nav-link2');

    links.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            links.forEach(l => l.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar-menu .nav-link2');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbar = document.querySelector('.navbar');

    links.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            links.forEach(l => l.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');
        });
    });

    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('menu-open');
    });
});