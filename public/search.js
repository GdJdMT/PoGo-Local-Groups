const result = document.getElementById('result');
const search = document.getElementById('search');
let timer = null;

const fetchTrainers = (city,query) => {
  fetch(`/api/search?city=${city}&q=${query}`)
  .then(res => res.json())
  .then(res => {
    if (res.length > 0) {
      for (let i of res) {
        const name = i.name;
        const displayName = i.displayName;
        result.innerHTML += `<li><a href="/profile/${name}">${displayName}</li>`;
      }
    } else {
      result.innerHTML = 'No trainers with this name :(';
    }
  })
  .catch(err => {throw err;});
}

search.addEventListener('keyup', (e) => {
  clearTimeout(timer);
  result.innerHTML = '';
  const query = search.value;
  const city = window.location.pathname.slice(1,-7);
  timer = setTimeout(function() {fetchTrainers(city,query)},200);
});
