const findBuddy = async (event) => {
  event.preventDefault();
  // remove event listener
  const { option } = event.target.dataset;
  const subject = document.querySelector('#create-room select').value;
  let response = {};

  if (option == 'find') {
    const [userRes, chatRes] = await Promise.all([
      fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
      }),
      fetch('/api/chats/subject', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject }),
      }),
    ]);
    userRes.ok && chatRes.ok ? (response.ok = true) : (response.ok = false);
  } else {
    response = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: true }),
    });
  }

  if (response.ok) document.location.replace('/chat');
  else alert(response.statusText);
};

document
  .querySelectorAll('.chat-btn')
  .forEach((el) => el.addEventListener('click', findBuddy));
