const path = window.location.pathname.slice(1);
const table = document.getElementById('last');
const rootStyle = getComputedStyle(document.body);
const chooseTeam = document.getElementById('team');
const response = document.getElementById('response');
chooseTeam.addEventListener('change', (e) =>{
  e.preventDefault();
  const team = e.target.value;
  const rootColor = team === 'blue' ? '--blue' : team === 'yellow' ? '--yellow' : '--red';
  const theme = rootStyle.getPropertyValue(rootColor)
  document.getElementById('mainHeading').style.setProperty('color','white');
  document.body.style.setProperty('background-color',theme);
  document.getElementById('submit').style.setProperty('background-color',theme)
});