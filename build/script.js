document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const fileInput = document.getElementById('profile-picture');
    const emailField = document.getElementById('email');
  
    /* Password validation */
    const validatePassword = () => {
      const password = passwordField.value;
      const minLength = 8;
      const passwordError = document.getElementById('password-error');
  
      /*Check if the password is long enough */

      if (password.length < minLength) {
        if (!passwordError) {
          const error = document.createElement('span');
          error.id = 'password-error';
          error.style.color = 'red';
          error.textContent = `Password must be at least ${minLength} characters.`;
          passwordField.insertAdjacentElement('afterend', error);
        }
        return false;
      } else {
        const error = document.getElementById('password-error');
        if (error) error.remove();
        return true;
      }
    };
  
    /* Confirm password validation */
    const validateConfirmPassword = () => {
      const password = passwordField.value;
      const confirmPassword = confirmPasswordField.value;
      const confirmPasswordError = document.getElementById('confirm-password-error');
  
      if (password !== confirmPassword) {
        if (!confirmPasswordError) {
          const error = document.createElement('span');
          error.id = 'confirm-password-error';
          error.style.color = 'red';
          error.textContent = 'Passwords do not match.';
          confirmPasswordField.insertAdjacentElement('afterend', error);
        }
        return false;
      } else {
        const error = document.getElementById('confirm-password-error');
        if (error) error.remove();
        return true;
      }
    };
  
    /* Terms and Conditions checkbox validation */
    const validateTerms = () => {
      if (!termsCheckbox.checked) {
        alert('You must accept the terms and conditions.');
        return false;
      }
      return true;
    };
  
    /* Profile picture preview */
    const previewImage = () => {
      const imagePreview = document.getElementById('image-preview');
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      if (file) {
        reader.onload = function () {
          if (!imagePreview) {
            const preview = document.createElement('img');
            preview.id = 'image-preview';
            preview.style.maxWidth = '200px';
            preview.style.marginTop = '20px';
            preview.src = reader.result;
            fileInput.insertAdjacentElement('afterend', preview);
          } else {
            imagePreview.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    /* Email format validation */
    const validateEmail = () => {
      const email = emailField.value;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
      return true;
    };
  
    /* Form submit validation */
    form.addEventListener('submit', function (event) {
      /* Run all validation checks before submitting the form */
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      const areTermsAccepted = validateTerms();
      const isEmailValid = validateEmail();
  
      if (!isPasswordValid || !isConfirmPasswordValid || !areTermsAccepted || !isEmailValid) {
        event.preventDefault(); /* Prevent form submission if any validation fails */
        alert('Please fix the errors in the form.');
      }
    });
  
    // Event listeners for input fields
    passwordField.addEventListener('blur', validatePassword); // Trigger password validation when field loses focus
    confirmPasswordField.addEventListener('blur', validateConfirmPassword); // Trigger confirm password validation
    termsCheckbox.addEventListener('change', validateTerms); // Validate terms when checkbox is clicked
    fileInput.addEventListener('change', previewImage); // Show image preview on file selection
    emailField.addEventListener('blur', validateEmail); // Validate email on blur (when the field loses focus)
  });
  