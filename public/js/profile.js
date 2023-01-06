$(function () {
  $('#date-picker').datepicker({
    onSelect: function () {
      var date = $(this).datepicker('getDate');
      console.log(date);
    },
  });
});

async function grabDate(event) {
  event.preventDefault();
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  console.log(date);
  console.log(time);
  await fetch(`/api/schedule`, {
    method: 'POST',
    body: JSON.stringify({
      date: date,
      time: time,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.reload();
}

document.querySelector('#add-schedule').addEventListener('submit', grabDate);
