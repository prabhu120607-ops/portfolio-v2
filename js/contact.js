/**
 * Contact JavaScript: Form validation and accessible submission handling
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const statusBox = document.getElementById('formStatusBox');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('has-error');
      const errorElem = formGroup.querySelector('.form-error');
      if (errorElem) {
        errorElem.textContent = message;
      }
    }
  }

  function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
  }

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        clearError(input);
        if (statusBox) {
          statusBox.style.display = 'none';
        }
      });
    }
  });

  contactForm.addEventListener('submit', (e) => {
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please enter your full name.');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      setError(nameInput, 'Name must be at least 2 characters long.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Please enter your email address.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address (e.g. name@example.com).');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, 'Please enter a message subject.');
      isValid = false;
    } else if (subjectInput.value.trim().length < 3) {
      setError(subjectInput, 'Subject must be at least 3 characters long.');
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setError(messageInput, 'Please enter your message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, 'Message should be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      e.preventDefault();
      // Focus first error field
      const firstError = contactForm.querySelector('.has-error input, .has-error textarea');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // If there is no PHP backend configured (form action is '#' or empty), handle client-side gracefully
    const formAction = contactForm.getAttribute('action');
    if (!formAction || formAction === '#' || formAction === 'contact.php') {
      // If contact.php does not exist on a static server (like Vercel), show friendly simulated success message
      // and prevent default page reload unless backend exists
      if (!window.location.protocol.startsWith('http') || window.location.hostname.includes('vercel.app') || formAction === '#') {
        e.preventDefault();
        if (statusBox) {
          statusBox.className = 'form-status-box success';
          statusBox.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been prepared. You can also reach me directly at prabhu120607@gmail.com.`;
          statusBox.style.display = 'block';
        }
        contactForm.reset();
      }
    }
  });
});
