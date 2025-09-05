  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent actual submission
    const alertBox = document.getElementById("formAlert");
    alertBox.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top

    this.reset();

    // hide alert after 5 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  });