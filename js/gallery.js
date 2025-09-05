    // Initialize modal with clicked image data
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
      imageModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-bs-title');
        const description = button.getAttribute('data-bs-description');
        const imageSrc = button.getAttribute('data-bs-image');
        
        const modalTitle = imageModal.querySelector('.modal-title');
        const modalDescription = imageModal.querySelector('#modalDescription');
        const modalImage = imageModal.querySelector('#modalImage');
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageSrc;
        modalImage.alt = title;
      });
    }