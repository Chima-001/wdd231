const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const caption = document.querySelector('figcaption');

const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=7878f863de27ae13aeacdfef3917d698';

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    console.log(data);
    displayResults(data);
  } catch (error) {
    console.log(error);
    caption.textContent = `Weather error: ${error.message}`;
  }
}


function displayResults(data) {
  const temp = data?.main?.temp;
  const iconCode = data?.weather?.[0]?.icon;
  const desc = data?.weather?.[0]?.description;

  if (temp === undefined || !iconCode || !desc) {
    throw new Error('Unexpected API response shape. Check the endpoint/response.');
  }

  currentTemp.innerHTML = `${Number(temp).toFixed(0)}&deg;F`;

  const iconsrc = `https://openweathermap.org/img/w/${iconCode}.png`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  caption.textContent = desc;
}


apiFetch();
