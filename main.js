document.addEventListener('DOMContentLoaded', () => {
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="close-btn">&times;</div>
        <div class="modal-content">
            <div id="video-container"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const videoContainer = modal.querySelector('#video-container');
    const closeBtn = modal.querySelector('.close-btn');

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Only trigger video if clicking the image or overlay
            if (e.target.closest('.play-overlay') || e.target.closest('img')) {
                const videoId = trigger.getAttribute('data-video');
                openModal(videoId);
            }
        });
    });

    function openModal(videoId) {
        // Handle shorts if needed, but standard embed works for both
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoContainer.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeModal() {
        modal.classList.remove('active');
        videoContainer.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
