(function () {
    'use strict';

    // ─── HEADER OCULTO / MOSTRAR ───
    const header = document.getElementById('main-header');
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        if (y > lastY && y > 80) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // ─── BOTÓN SCROLL TOP ───
    const scrollBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── TEMA · OSCURO POR DEFECTO ───
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Si guardó "light" alguna vez, respetarlo; si no, modo oscuro
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        themeIcon.textContent = '◐';
    } else {
        themeIcon.textContent = '◑';
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        themeIcon.textContent = isLight ? '◐' : '◑';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // ─── FLIP CARDS ───
    document.querySelectorAll('.flip-card').forEach(function (card) {
        card.addEventListener('click', function () {
            card.classList.toggle('flipped');
        });
    });

    // ─── VIDEOS ───
    document.querySelectorAll('.video-item').forEach(function (item) {
        const video = item.querySelector('video');
        if (!video) return;

        item.addEventListener('click', function () {
            if (video.paused) {
                document.querySelectorAll('.video-item video').forEach(function (v) {
                    if (v !== video) v.pause();
                });
                video.play().catch(function () {});
            } else {
                video.pause();
            }
        });
    });

    // ─── NAVEGACIÓN SUAVE ───
    document.querySelectorAll('nav a, .logo').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id && id.startsWith('#')) {
                const el = document.querySelector(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
})();