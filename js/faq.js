    // FAQ toggle functionality
    function toggleFAQ(element) {
      const faqCard = element.closest('.faq-card');
      faqCard.classList.toggle('active');
      
      // Close other open FAQs when opening a new one
      if (faqCard.classList.contains('active')) {
        document.querySelectorAll('.faq-card').forEach(card => {
          if (card !== faqCard && card.classList.contains('active')) {
            card.classList.remove('active');
          }
        });
      }
    }

    // Open FAQ if URL has hash matching question ID
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.hash) {
        const targetQuestion = document.querySelector(window.location.hash);
        if (targetQuestion && targetQuestion.classList.contains('faq-question')) {
          toggleFAQ(targetQuestion);
          targetQuestion.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });