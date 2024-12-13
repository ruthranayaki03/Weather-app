const apiKey = '94941f6f1c60c0bc08e84d408aa4994b';
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');
const weatherApp = document.querySelector('.weather-app');
const btn=document.querySelector('.submit');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
  search.value = '';
});

cities.forEach(city => {
  city.addEventListener('click', () => {
    getWeather(city.textContent);
  });
});

function getWeather(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?key&q=${cityName}&units=metric&appid=${'94941f6f1c60c0bc08e84d408aa4994b'}`)
    .then(response => response.json())
    
    .then(data => updateWeather(data))
    
    .catch(error => console.log(error));
}

function updateWeather(data) {
  const temp = document.querySelector('.temp');
  const name = document.querySelector('.name');
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');
  const icon = document.querySelector('.icon');
  const condition = document.querySelector('.condition');
  const cloud = document.querySelector('.Cloud');
  const humidity = document.querySelector('.Humidity');
  const wind = document.querySelector('.Wind');

  const temperature = Math.round(data.main.temp);
  const cityName = data.name;
  const weatherCondition = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const cloudiness = data.clouds.all;
  const humidityLevel = data.main.humidity;
  const windSpeed = data.wind.speed;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const dateNum = now.getDate();

  temp.innerHTML = `${temperature}&#176;`;
  name.textContent = cityName;
  time.textContent = `${hours}:${minutes}`;
  date.textContent = `${day} ${month} ${dateNum}`;
  icon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  condition.textContent = weatherCondition;
  cloud.textContent = `${cloudiness}%`;
  humidity.textContent = `${humidityLevel}%`;
  wind.textContent = `${windSpeed} km/h`;

  setWeatherBackground(weatherCondition);
}

function setWeatherBackground(condition) {
  let background = '';
  switch (condition.toLowerCase()) {
    case 'clear':
      background = 'url(./images/clear.jpg)';
      btn.style.background="#e5ba92";

      break;
    case 'clouds':
      background = 'url(./images/cloud.jpg)';
      btn.style.background="#fa6d1b";

      break;
    case 'rain':
      background = 'url(./images/rain.jpg)';
      btn.style.background="#647d75";

      break;
    case 'snow':
      background = 'url(./images/snow.jpg)';               
      btn.style.background="#4d72aa";

      break;
    case 'thunderstorm':
      background = 'url(./images/tunderstrom.jpg)';
      btn.style.background="#325c80";

      break;
    default:
      background = 'url(./images/default.jpg)';
      btn.style.background="#1b1b1b";

      break;
  }
  weatherApp.style.backgroundImage = background;
}
