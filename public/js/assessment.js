const updateMessageEl = document.querySelector('#updated-message');

const showAlert = (message) => {
  const alertEl = document.createElement('section');
  updateMessageEl.textContent = '';

  alertEl.classList.add('alert', 'alert-warning', 'alert-dismissible');
  alertEl.innerHTML = ` <b>Self assessment updated</b>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button >`;
  updateMessageEl.append(alertEl);
};

document.querySelector('#submit-btn').addEventListener('click', showAlert);
