// $(document).ready( function() {
// var templateSource = $("#details-template").html();
// var template = Handlebars.compile(templateSource);
//     $('#submitButton').click(function(){
//             $("#detailsBox").html(template({"nameValue":$('#nameInput').val(), "ageValue":$('#ageInput').val()}));
//     });
// });

$(function () {
  $('#datepicker').datepicker({
    onSelect: function () {
      var date = $(this).datepicker('getDate');
      console.log(date);
    },
  });
});

document.getElementById('date');

//var date=$("#date").datepicker("getDate").val()
//var date=dateEl.value
//console.log(dateEl)

async function grabDate(event) {
  event.preventDefault();
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  console.log(date);
  console.log(time);
  await fetch(`/api/availability`, {
    method: 'POST',
    body: JSON.stringify({
      date: date,
      time: time,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  //document.location.replace('/dashboard');
}

document.querySelector('#demoForm').addEventListener('submit', grabDate);
