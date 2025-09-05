    // Tab switching functionality
    document.addEventListener('DOMContentLoaded', function() {
      const tabs = document.querySelectorAll('.auth-tab');
      const switchToSignup = document.querySelector('.switch-to-signup');
      const switchToLogin = document.querySelector('.switch-to-login');
      
      // Tab click handler
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Remove active class from all tabs and content
          document.querySelectorAll('.auth-tab, .auth-content').forEach(el => {
            el.classList.remove('active');
          });
          
          // Add active class to clicked tab and corresponding content
          this.classList.add('active');
          document.getElementById(`${tabId}-content`).classList.add('active');
        });
      });
      
      // Switch to signup from login
      if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector('.auth-tab[data-tab="signup"]').click();
        });
      }
      
      // Switch to login from signup
      if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector('.auth-tab[data-tab="login"]').click();
        });
      }
    });

    // Password toggle function
    function togglePassword(inputId, iconId) {
      const passwordInput = document.getElementById(inputId);
      const icon = document.getElementById(iconId);
      
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    // Email validation function
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    }

    // Password validation function
    function validatePassword(password) {
      const hasMinLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      return {
        isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber,
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber
      };
    }

    // Update password requirements UI
    function updatePasswordRequirements(password) {
      const validation = validatePassword(password);
      
      // Update each requirement indicator
      document.getElementById('req-length').className = validation.hasMinLength ? 'text-success' : 'text-danger';
      document.getElementById('req-length').innerHTML = validation.hasMinLength ? 
        '<i class="fas fa-check-circle"></i> At least 8 characters' : 
        '<i class="fas fa-times-circle"></i> At least 8 characters';
      
      document.getElementById('req-uppercase').className = validation.hasUpperCase ? 'text-success' : 'text-danger';
      document.getElementById('req-uppercase').innerHTML = validation.hasUpperCase ? 
        '<i class="fas fa-check-circle"></i> 1 uppercase letter' : 
        '<i class="fas fa-times-circle"></i> 1 uppercase letter';
      
      document.getElementById('req-lowercase').className = validation.hasLowerCase ? 'text-success' : 'text-danger';
      document.getElementById('req-lowercase').innerHTML = validation.hasLowerCase ? 
        '<i class="fas fa-check-circle"></i> 1 lowercase letter' : 
        '<i class="fas fa-times-circle"></i> 1 lowercase letter';
      
      document.getElementById('req-number').className = validation.hasNumber ? 'text-success' : 'text-danger';
      document.getElementById('req-number').innerHTML = validation.hasNumber ? 
        '<i class="fas fa-check-circle"></i> 1 number' : 
        '<i class="fas fa-times-circle"></i> 1 number';
      
      return validation.isValid;
    }

    // Check if passwords match
    function checkPasswordMatch() {
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      const confirmFeedback = document.getElementById('confirm-password-feedback');
      
      if (password && confirmPassword && password !== confirmPassword) {
        document.getElementById('signup-confirm-password').classList.add('is-invalid');
        confirmFeedback.textContent = 'Passwords do not match';
        return false;
      } else {
        document.getElementById('signup-confirm-password').classList.remove('is-invalid');
        return true;
      }
    }

    // Updated showAlert function to use alert-info class
    function showAlert(message, type = 'info') {
      const alert = document.getElementById('successAlert');
      alert.textContent = message;
      
      // Force alert-info class for blue color
      alert.className = 'alert alert-info show';
      
      // Hide after 3 seconds
      setTimeout(() => {
        alert.classList.remove('show');
      }, 3000);
    }

    // Reset form function
    function resetForm(formId) {
      const form = document.getElementById(formId);
      form.reset();
      
      // Remove all invalid classes
      const invalidElements = form.querySelectorAll('.is-invalid');
      invalidElements.forEach(el => {
        el.classList.remove('is-invalid');
      });
      
      // Reset password requirements
      if (formId === 'signupForm') {
        document.getElementById('req-length').className = 'text-danger';
        document.getElementById('req-length').innerHTML = '<i class="fas fa-times-circle"></i> At least 8 characters';
        
        document.getElementById('req-uppercase').className = 'text-danger';
        document.getElementById('req-uppercase').innerHTML = '<i class="fas fa-times-circle"></i> 1 uppercase letter';
        
        document.getElementById('req-lowercase').className = 'text-danger';
        document.getElementById('req-lowercase').innerHTML = '<i class="fas fa-times-circle"></i> 1 lowercase letter';
        
        document.getElementById('req-number').className = 'text-danger';
        document.getElementById('req-number').innerHTML = '<i class="fas fa-times-circle"></i> 1 number';
      }
    }

    // Event listeners for signup form validation
    document.getElementById('signup-password').addEventListener('input', function() {
      updatePasswordRequirements(this.value);
      checkPasswordMatch();
    });

    document.getElementById('signup-confirm-password').addEventListener('input', function() {
      checkPasswordMatch();
    });

    document.getElementById('signup-email').addEventListener('input', function() {
      const emailValid = validateEmail(this.value);
      const emailFeedback = document.getElementById('signup-email-feedback');
      
      if (this.value && !emailValid) {
        this.classList.add('is-invalid');
        emailFeedback.textContent = 'Please enter a valid email address';
      } else {
        this.classList.remove('is-invalid');
      }
    });

    // Form submission handlers
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');
      let isValid = true;
      
      // Validate email
      if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        document.getElementById('login-email-feedback').textContent = 'Please enter a valid email address';
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
      }
      
      // Validate password
      if (!password.value) {
        password.classList.add('is-invalid');
        document.getElementById('login-password-feedback').textContent = 'Please enter your password';
        isValid = false;
      } else {
        password.classList.remove('is-invalid');
      }
      
      if (isValid) {
        // Form is valid, proceed with login
        showAlert('Login successful!', 'success');
        resetForm('loginForm');
        // Here you would typically send the data to your server
        // window.location.href = 'dashboard.html';
      }
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all fields
      const firstNameValid = document.getElementById('signup-fname').value.trim() !== '';
      const lastNameValid = document.getElementById('signup-lname').value.trim() !== '';
      const emailValid = validateEmail(document.getElementById('signup-email').value);
      const passwordValid = validatePassword(document.getElementById('signup-password').value).isValid;
      const passwordsMatch = checkPasswordMatch();
      const termsAgreed = document.getElementById('terms-agree').checked;
      
      // Mark invalid fields
      if (!firstNameValid) {
        document.getElementById('signup-fname').classList.add('is-invalid');
      }
      if (!lastNameValid) {
        document.getElementById('signup-lname').classList.add('is-invalid');
      }
      if (!emailValid) {
        document.getElementById('signup-email').classList.add('is-invalid');
      }
      if (!passwordValid) {
        document.getElementById('signup-password').classList.add('is-invalid');
      }
      if (!termsAgreed) {
        document.getElementById('terms-agree').classList.add('is-invalid');
      }
      
      if (firstNameValid && lastNameValid && emailValid && passwordValid && passwordsMatch && termsAgreed) {
        // Form is valid, proceed with signup
        showAlert('Account created successfully!', 'success');
        resetForm('signupForm');
        // Here you would typically send the data to your server
        // Then redirect or show success message
      } else {
        showAlert('Please fill out all fields correctly', 'danger');
      }
    });