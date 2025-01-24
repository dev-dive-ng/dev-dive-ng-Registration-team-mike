document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');
  const emailField = document.getElementById('email');
  const submitBtn = document.getElementById('submitBtn');
  const profilePictureField = document.getElementById('profile-picture');

  const validatePassword = () => {
    const password = passwordField.value;
    const minLength = 8;

    if (password.length < minLength) {
      alert(`Password must be at least ${minLength} characters.`);
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (passwordField.value !== confirmPasswordField.value) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      alert('You must accept the terms and conditions.');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const email = emailField.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const readProfilePicture = (fileInput) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(fileInput.files[0]);
    });
  };

  submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    // Run all validations
    if (
      validatePassword() &&
      validateConfirmPassword() &&
      validateTerms() &&
      validateEmail()
    ) {
      // Collect form data
      const formData = new FormData(form);
      const dataObject = {};

      formData.forEach((value, key) => {
        if (key === 'profile_picture') {
          // Handle profile picture separately
          readProfilePicture(profilePictureField).then((base64Image) => {
            dataObject[key] = base64Image;

            // Save data to sessionStorage
            sessionStorage.setItem('formData', JSON.stringify(dataObject));

            // Redirect to result.html
            window.location.href = 'submit_page.html';
          }).catch((err) => console.error('Error reading file:', err));
        } else {
          dataObject[key] = value;
        }
      });
    }
  });
});
