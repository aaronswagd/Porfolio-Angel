(function() {
    'use strict';

    // ─── HEADER OCULTO / MOSTRAR ───
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const threshold = 80; // se oculta un poco antes

        if (currentScrollY > lastScrollY && currentScrollY > threshold) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
            });
            ticking = true;
        }
    });

    // ─── BOTÓN DE SCROLL ───
    const scrollBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ─── VIDEOS ───
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'VIDEO') return;
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });

        video.addEventListener('click', function(e) {
            e.stopPropagation();
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });

        video.addEventListener('play', function() {
            videoCards.forEach(otherCard => {
                const otherVideo = otherCard.querySelector('video');
                if (otherVideo && otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });

    // ─── PAUSAR VIDEOS AL SALIR DE PANTALLA ───
    if ('IntersectionObserver' in window) {
        const videos = document.querySelectorAll('video');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                }
            });
        }, { threshold: 0.2 });
        videos.forEach(v => observer.observe(v));
    }

    // ─── NAVEGACIÓN SUAVE ───
    document.querySelectorAll('nav a, .hero-btn[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

})();