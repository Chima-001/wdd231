const apiKey = '7878f863de27ae13aeacdfef3917d698';
const lat = 6.447655014490208;
const lon = 7.513317577495719;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getRandomHero() {
  const hero = document.querySelector('.hero');

  const heroImg = document.querySelector('#heroImg');

  if (!heroImg) return;
  try {
    const response = await fetch('data/hero.json');
    const data = await response.json();
    const images = data.heroImages;

    const randomIndex = Math.floor(Math.random() * images.length);
    heroImg.src = images[randomIndex]
    heroImg.alt = data.heroAlt;
  } catch (error) {
    console.error('Failed to load hero images:', error)
  }
}

getRandomHero();

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Weather error:', error);
  }
}

const CurrentTemp = document.querySelector('#current-temp');
const description = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');

function displayWeather(data) {
  const temp = `${Math.round(data.main.temp)}°C`;
  const desc = data.weather[0].description;

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  if (!CurrentTemp || !description || !weatherIcon) return;

  CurrentTemp.textContent = temp;
  description.textContent = desc;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error('Forecast error:', error);
  }
}

function displayForecast(data) {
  const container = document.querySelector('#forecast');
  if (!container) return;
  const days = {};

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (!days[day] && Object.keys(days).length < 3) {
      days[day] = Math.round(item.main.temp);
    }
  });

  Object.entries(days).forEach(([day, temp]) => {
    const row = document.createElement('p');
    row.textContent = `${day}: ${temp}°C`;
    container.appendChild(row);
  });
}

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    const eligible = data.members.filter(m => m.membershipLevel >= 2);
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffled.slice(0, count);
    displaySpotlights(selected);
  } catch (error) {
    console.error('Spotlight error:', error);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector('#spotlights');
  if (!container) return;

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    const img = document.createElement('img');
    img.setAttribute('src', `images/${member.image}`);
    img.setAttribute('alt', member.name);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '200');
    img.setAttribute('height', '150');

    const name = document.createElement('h3');
    name.textContent = member.name;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const address = document.createElement('p');
    address.textContent = member.address;

    const site = document.createElement('a');
    site.href = member.website;
    site.textContent = 'View Details';
    site.target = '_blank';
    site.rel = 'noopener';

    const levels = { 2: 'Silver Member', 3: 'Gold Member' };
    const badge = document.createElement('p');
    badge.textContent = levels[member.membershipLevel];
    badge.classList.add('badge', `level-${member.membershipLevel}`);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(phone);
    card.appendChild(address);
    card.appendChild(site);
    card.appendChild(badge);

    container.appendChild(card);
  });
}

if (document.querySelector('#current-temp')) getWeather();
if (document.querySelector('#forecast')) getForecast();
if (document.querySelector('#spotlights')) getSpotlights();