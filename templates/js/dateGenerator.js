const setDate = function() {
  const d = new Date();
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const currentMonth = months[d.getMonth()];
  const currentDay = weekDays[d.getDay()];
  const dateBoxes = Array.from(document.getElementsByClassName('month'));
  dateBoxes.forEach(
    dateBox =>
      (dateBox.innerText = `${currentMonth}, ${currentDay}, ${d.getDate()}`)
  );
};
