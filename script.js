const form = document.querySelector('form');
const successMessage = document.querySelector('.success-message');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const queryInputs = document.querySelectorAll('input[name="query"]');
const consent = document.getElementById('consent');

const errorMessages = {
  firstName: document.getElementById('first-name-error'),
  lastName: document.getElementById('last-name-error'),
  email: document.getElementById('email-error'),
  query: document.getElementById('query-error'),
  message: document.getElementById('message-error'),
  consent: document.getElementById('consent-error'),
};

function showError(input, message) {
  const errorElement = errorMessages[input];
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideError(input) {
  const errorElement = errorMessages[input];
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

function validateQuery() {
  const checked = Array.from(queryInputs).some(input => input.checked);
  if (!checked) {
    showError('query', 'Please select a query type');
    document.querySelector('.query-options').classList.add('invalid');
    return false;
  }
  hideError('query');
  document.querySelector('.query-options').classList.remove('invalid');
  return true;
}

function validateConsent() {
  if (!consent.checked) {
    showError('consent', 'To submit this form, please consent to being contacted');
    consent.classList.add('invalid');
    return false;
  }
  hideError('consent');
  consent.classList.remove('invalid');
  return true;
}

function validateField(input, key, message) {
  if (!input.value.trim()) {
    showError(key, message);
    input.classList.add('invalid');
    return false;
  }

  if (input.type === 'email' && !input.validity.valid) {
    showError(key, 'Please enter a valid email address');
    input.classList.add('invalid');
    return false;
  }

  hideError(key);
  input.classList.remove('invalid');
  return true;
}

function validateForm() {
  const nameValid = validateField(firstName, 'firstName', 'This field is required');
  const lastValid = validateField(lastName, 'lastName', 'This field is required');
  const emailValid = validateField(email, 'email', 'This field is required');
  const messageValid = validateField(message, 'message', 'This field is required');
  const queryValid = validateQuery();
  const consentValid = validateConsent();

  return nameValid && lastValid && emailValid && messageValid && queryValid && consentValid;
}

function resetErrors() {
  Object.keys(errorMessages).forEach(key => hideError(key));
  firstName.classList.remove('invalid');
  lastName.classList.remove('invalid');
  email.classList.remove('invalid');
  message.classList.remove('invalid');
  consent.classList.remove('invalid');
  document.querySelector('.query-options').classList.remove('invalid');
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  resetErrors();
  successMessage.style.display = 'none';

  if (validateForm()) {
    successMessage.style.display = 'block';
    successMessage.focus();
    form.reset();
  }
});

form.addEventListener('input', () => {
  successMessage.style.display = 'none';
});
