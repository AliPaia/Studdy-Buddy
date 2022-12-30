const findBuddy = async (event) => {
  event.preventDefault();
  const { option } = event.target.dataset;
  let response;

  if (option == 'find') {
    response = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: false }),
    });
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
