// Bootstrap 5 form validation
(function () {
  'use strict';

  // Select all forms with class 'needs-validation'
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over each form and prevent submission if invalid
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      // Check form validity
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Add Bootstrap validation class
      form.classList.add('was-validated');
    }, false);
  });
})();
