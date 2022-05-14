function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let hour = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${hour}:${minutes}`;
}

const apiKey = "e6db7c6cb2c48b291ca96f8139791e58";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
function createWeatherApiLink(city) {
  let apiUrl = `${baseWeatherUrl}?q=${city}&units=metric&appid=${apiKey}`;
  return apiUrl;
}

function createWeatherApiLinkByCoords(lat, lon) {
  let geoApiUrl = `${baseWeatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  return geoApiUrl;
}

function showCity(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
}

function displayDescription(response) {
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = temperature;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let maxTemp = document.querySelector("#temp-max");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#temp-min");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function displayData(response) {
  showCity(response);
  displayDescription(response);
}

function getWeatherDataForCity(event) {
  event.preventDefault();

  let cityElement = document.querySelector(".location");
  let city = cityElement.value.trim();

  if (city == "") {
    alert("Please specify a valid location");
    return;
  }

  axios.get(createWeatherApiLink(city)).then(displayData);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", getWeatherDataForCity);

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(createWeatherApiLinkByCoords(latitude, longitude))
    .then(displayData);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector("#fahrenheit");
  let celsiusElement = document.querySelector("#celsius");
  let temperatureElement = document.querySelector("#temp");

  if (fahrenheitElement.classList.contains("active")) {
    return;
  }
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");

  let celsiusTemp = temperatureElement.innerHTML;
  let fahrenheitTemp = celsiusTemp * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  let fahrenheitElement = document.querySelector("#fahrenheit");
  let celsiusElement = document.querySelector("#celsius");
  let temperatureElement = document.querySelector("#temp");

  if (celsiusElement.classList.contains("active")) {
    return;
  }

  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");

  let fahrenheitTemp = temperatureElement.innerHTML;
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", displayFahrenheitTemp);

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", displayCelsiusTemp);

/*
function displayMaxFahrenheitTemp(event) {
  event.preventDefault();
  let maxFahrenheitElement = document.querySelector("#max-fahrenheit");
  let maxCelsiusElement = document.querySelector("#max-celsius");
  let maxTemperatureElement = document.querySelector("#max-temp");

  if (maxFahrenheitElement.classList.contains("active")) {
    return;
  }
  maxCelsiusElement.classList.remove("active");
  maxFahrenheitElement.classList.add("active");

  let maxCelsiusTemp = maxTemperatureElement.innerHTML;
  let maxFahrenheitTemp = maxCelsiusTemp * 1.8 + 32;
  maxTemperatureElement.innerHTML = Math.round(maxFahrenheitTemp);
}

function displayMaxCelsiusTemp(event) {
  event.preventDefault();

  let maxFahrenheitElement = document.querySelector("#max-fahrenheit");
  let maxCelsiusElement = document.querySelector("#max-celsius");
  let maxTemperatureElement = document.querySelector("#max-temp");

  if (maxCelsiusElement.classList.contains("active")) {
    return;
  }

  maxCelsiusElement.classList.add("active");
  maxFahrenheitElement.classList.remove("active");

  let maxFahrenheitTemp = maxTemperatureElement.innerHTML;
  let maxCelsiusTemp = ((maxFahrenheitTemp - 32) * 5) / 9;
  maxTemperatureElement.innerHTML = Math.round(maxCelsiusTemp);
}

let maxFahrenheitUnit = document.querySelector("#max-fahrenheit");
maxFahrenheitUnit.addEventListener("click", displayMaxFahrenheitTemp);

let maxCelsiusUnit = document.querySelector("#max-celsius");
maxCelsiusUnit.addEventListener("click", displayMaxCelsiusTemp);
*/
