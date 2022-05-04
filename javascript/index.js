function showDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[newDate.getDay()];

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
  let currentMonth = months[newDate.getMonth()];

  let currentDate = newDate.getDate();
  let currentYear = newDate.getFullYear();
  let date = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  let hour = String(newDate.getHours()).padStart(2, "0");
  let minutes = String(newDate.getMinutes()).padStart(2, "0");
  let currentTime = `${hour}:${minutes}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${date}, ${currentTime}`;
}

console.log(showDate(new Date()));

function createWeatherApiLink(city) {
  let apiKey = "e6db7c6cb2c48b291ca96f8139791e58";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  return url;
}

function createWeatherApiLinkByCoords(lat, lon) {
  let apiKey = "e6db7c6cb2c48b291ca96f8139791e58";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  return url;
}

function displayWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}, ${temperature} &deg;C`;
}

function displayDescription(response) {
  let weatherDescription = response.data.weather[0].description;

  let h3 = document.querySelector("h3");
  h3.innerHTML = weatherDescription;
}

function displayData(response) {
  displayWeather(response);
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

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);
