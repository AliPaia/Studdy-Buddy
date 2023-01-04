const profileLoginBtn = document.getElementById('profile-login');
const createAccountBtn = document.getElementById('create-account');
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

profileLoginBtn.addEventListener('click', async function (event) {
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
    document.location.replace('/profile');
  } else {
    const { message } = await response.json();
    console.log(message);
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
    document.location.replace('/assessment');
  } else {
    const [error] = (await response.json()).errors;
    const { validatorKey } = error;
    if (validatorKey == 'len') {
      console.log('password must be 8 in length');
    } else if (validatorKey == 'not_unique') {
      console.log('username is already taken');
    } else {
      console.log('Error');
    }
  }
});
