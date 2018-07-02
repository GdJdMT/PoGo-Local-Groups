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

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = document.getElementById('nick').value;
  const team = document.querySelector('input[name="team"]:checked').value;
  const code = document.getElementById('code').value;
  const body = { nick: nick, team: team, code: code, city:path };
  fetch('new', {body:JSON.stringify(body), method:'POST', headers: {
      'content-type': 'application/json'
    }})
  .then(res=>res.json())
  .then(res=>{
    response.className += `alert ${res.success ? 'success' : 'danger'}`;
    response.innerHTML = res.message;
    if (res.success) { document.getElementById('submit').innerHTML = 'Done!';}
  })
  .catch(err=>{throw err});
});