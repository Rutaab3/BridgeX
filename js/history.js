    // Initialize modal with clicked image data
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
      imageModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-bs-title');
        const description = button.getAttribute('data-bs-description');
        const imageSrc = button.getAttribute('data-bs-image');
        const technical = button.getAttribute('data-bs-technical');
        const significance = button.getAttribute('data-bs-significance');
        
        const modalTitle = imageModal.querySelector('.modal-title');
        const modalDescription = imageModal.querySelector('#modalDescription');
        const modalImage = imageModal.querySelector('#modalImage');
        const modalTechnical = imageModal.querySelector('#modalTechnical');
        const modalSignificance = imageModal.querySelector('#modalSignificance');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalTechnical.innerHTML = technical;
        modalSignificance.innerHTML = significance;
      });
    }