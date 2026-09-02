(function() {
    'use strict';

    // 1) Reproducir / pausar video al hacer clic en la tarjeta
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

    // 2) Intersection Observer para pausar videos al salir de pantalla
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

    // 3) Navegación suave
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