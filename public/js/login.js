console.log('JS is running!');
const loginToProfileBtn = document.getElementById('profile-login');
const loginCreateAccountBtn = document.getElementById('create-account');

loginToProfileBtn.addEventListener('click', async function (event) {
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
    alert(response.statusText);
  }
});

loginCreateAccountBtn.addEventListener('click', function () {
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
});
