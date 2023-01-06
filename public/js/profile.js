const DateTime = luxon.DateTime;
const scheduleEl = document.querySelector('#add-schedule');
const scheduleArr = document.querySelectorAll('.schedule-slot');

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
    minute: time[1],
  };
  const dt = DateTime.fromObject(dateObj);

  const response = await fetch('/api/schedules', {
    method: 'POST',
    body: JSON.stringify({
      date: dt,
    }),
    headers: { 'Content-Type': 'application/json' },
  });


  if (response.ok) {
    document.location.reload();
  }
}

const deleteSchedule = async (event) => {
  event.preventDefault();
  const { id } = event.target.dataset;

  const response = await fetch('api/schedules/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  }
};

scheduleEl.addEventListener('submit', grabDate);
scheduleEl.querySelector('#date').value = DateTime.now().toFormat('LL/dd/yyyy');
scheduleArr.forEach((schedule) => {
  schedule.querySelector('button').addEventListener('click', deleteSchedule);
});
