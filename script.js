const apiKey = '0c1d6fd21f758cbae6194b261c93bdd8';

async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultBox = document.getElementById('weatherResult');
  const effectBox = document.getElementById('weatherEffect');

  resultBox.innerHTML = '';
  effectBox.innerHTML = '';

  if (!location) {
    resultBox.innerHTML = 'Please enter a location.';
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      resultBox.innerHTML = `Error: ${data.message}`;
      return;
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    resultBox.innerHTML = weatherHTML;

    const condition = data.weather[0].main;
    const description = data.weather[0].description.toLowerCase();

    // Reset body class for new background
    document.body.className = '';

    if (condition === 'Rain') {
      document.body.classList.add('rain');
      for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = 1 + Math.random() + 's';
        effectBox.appendChild(drop);
      }
    } else if (condition === 'Clear') {
      document.body.classList.add('clear');
      const sun = document.createElement('div');
      sun.classList.add('sun');
      effectBox.appendChild(sun);
    } else if (condition === 'Snow') {
      document.body.classList.add('snow');
      for (let i = 0; i < 80; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = 2 + Math.random() * 4 + 's';
        effectBox.appendChild(flake);
      }
    } else if (condition === 'Clouds' || description.includes('overcast')) {
      document.body.classList.add('clouds');
      for (let i = 0; i < 4; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('pretty-cloud');
        cloud.style.left = Math.random() * 100 + 'vw';
        cloud.style.top = 30 + i * 50 + 'px';
        cloud.style.animationDelay = i * 2 + 's';
        effectBox.appendChild(cloud);
      }
    } else if (condition === 'Thunderstorm') {
      document.body.classList.add('thunder');
      const thunder = document.createElement('div');
      thunder.classList.add('thunder');
      effectBox.appendChild(thunder);
    }
  } catch (error) {
    resultBox.innerHTML = 'Failed to fetch weather data. Please try again.';
  }
}