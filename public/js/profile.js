const DateTime = luxon.DateTime;
const scheduleEl = document.querySelector('#add-schedule')

// calender
$(function () {
  $('#date-picker').datepicker({
    onSelect: function () {
      var date = $(this).datepicker('getDate');
      console.log(date);
    },
  });
});

// submit schedule
async function grabDate(event) {
  event.preventDefault();
  const date = document.getElementById('date').value.split('/');
  const time = document.getElementById('time').value.split(':');
  const dateObj = {
    month: date[0],
    day: date[1],
    year: date[2],
    hour: time[0],
    minute: time[1]
  }
  const dt = DateTime.fromObject(dateObj)

  await fetch('/api/schedules', {
    method: 'POST',
    body: JSON.stringify({
      date: dt,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const response = await fetch('/api/schedules', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const scheduleData = await response.json();
  console.log(scheduleData[0].date);
  console.log(DateTime.fromISO(scheduleData[0].date))
  document.location.reload();
}

scheduleEl.addEventListener('submit', grabDate);

scheduleEl.querySelector('#date').value = DateTime.now().toFormat('LL/dd/yyyy');
