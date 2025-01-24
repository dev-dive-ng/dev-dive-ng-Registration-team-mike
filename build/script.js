document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirm-password");
  const termsCheckbox = document.getElementById("terms");
  const emailField = document.getElementById("email");
  const submitBtn = document.getElementById("submitBtn");

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
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const validateTerms = () => {
    if (!termsCheckbox.checked) {
      alert("You must accept the terms and conditions.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const email = emailField.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  submitBtn.addEventListener("click", (event) => {
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
        dataObject[key] = value;
      });

      // Save data to sessionStorage
      sessionStorage.setItem("formData", JSON.stringify(dataObject));

      // Redirect to result.html
      window.location.href = "submit_page.html";
    }
  });
});
