const profileLoginBtn = document.getElementById('profile-login');
const createAccountBtn = document.getElementById('create-account');

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
    alert(response.statusText);
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
    alert(response.statusText);
  }
});
