const homepageLoginBtn = document.getElementById('homepage-login');
const createAccountBtn = document.getElementById('create-account');
const errorWarningEl = document.querySelector('#error-warning');
const tooltipTrigger = document.querySelector('[data-bs-toggle="tooltip"]');
const tooltipList = new bootstrap.Tooltip(tooltipTrigger);

const showAlert = (message) => {
  const alertEl = document.createElement('section');
  errorWarningEl.textContent = '';

  alertEl.classList.add('alert', 'alert-warning', 'alert-dismissible');
  alertEl.innerHTML = ` <b>${message}</b>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  errorWarningEl.append(alertEl);
};

homepageLoginBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  const url = '/api/users/login';
  const data = {
    username: usernameInput,
    password: passwordInput,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const { message } = await response.json();
    showAlert(message);
  }
});

createAccountBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById('user-create').value;
  const passwordInput = document.getElementById('password-create').value;

  const url = '/api/users';
  const data = {
    username: usernameInput,
    password: passwordInput,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const [error] = (await response.json()).errors;
    const { validatorKey } = error;
    if (validatorKey == 'len') {
      showAlert('Password must be 8 in length');
    } else if (validatorKey == 'not_unique') {
      showAlert('Username is already taken');
    } else {
      console.log('Error');
    }
  }
});
