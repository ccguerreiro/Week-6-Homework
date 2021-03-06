//WEEK 5

let now = new Date();

function formatDate(Date) {
  let days = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Tursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let CurrentDayOfTheWeek = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = months[now.getMonth()];

  let currentDay = now.getDate();

  let currentYear = now.getFullYear();

  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentDate = document.querySelector("#today-date");
  currentDate.innerHTML = `${CurrentDayOfTheWeek}, ${currentMonth} ${currentDay} ${currentYear} - ${currentHours}h${currentMinutes}`;

  return formatDate;
}
console.log(formatDate(now));

//Search Engine

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input").value;

  let h1 = document.querySelector("h1");
  if (searchInput) {
    h1.innerHTML = `${searchInput}`;
  } else {
    h1.innerHTML = null;
    alert("Something is wrong, please type a city");
  }
  citySearchData(searchInput);

  function citySearchData(city) {
    let apiKey = "8d356fc67ebb88e8c4c99fed9f89094c";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showTemperature);
  }

  function showTemperature(response) {
    let temperatureValue = Math.round(response.data.main.temp);
    let humidityValue = Math.round(response.data.main.humidity);
    let descriptionText = response.data.weather[0].description;
    let windValue = Math.round(response.data.wind.speed);
    let temperature = document.querySelector("#actual-temperature");
    let humidity = document.querySelector("#actual-humidity");
    let wind = document.querySelector("#actual-wind");
    let description = document.querySelector("#actual-description");

    temperature.innerHTML = `${temperatureValue}??C`;
    humidity.innerHTML = `humidity: ${humidityValue}%`;
    wind.innerHTML = `wind: ${windValue} m/s`;
    description.innerHTML = `${descriptionText}`;
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Current Location Button
function showLocation(event) {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "8d356fc67ebb88e8c4c99fed9f89094c";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    axios.get(url).then(showCurrentLocationTemperature);
  }
  function showCurrentLocationTemperature(response) {
    let temperatureValue = Math.round(response.data.main.temp);
    let humidityValue = Math.round(response.data.main.humidity);
    let descriptionText = response.data.weather[0].description;
    let windValue = Math.round(response.data.wind.speed);
    let locationName = response.data.name;
    let temperature = document.querySelector("#actual-temperature");
    let humidity = document.querySelector("#actual-humidity");
    let wind = document.querySelector("#actual-wind");
    let description = document.querySelector("#actual-description");
    let h1 = document.querySelector("h1");

    h1.innerHTML = `${locationName}`;
    temperature.innerHTML = `${temperatureValue}??C`;
    humidity.innerHTML = `humidity: ${humidityValue}%`;
    wind.innerHTML = `wind: ${windValue} m/s`;
    description.innerHTML = `${descriptionText}`;

    let searchInput = document.querySelector("#search-text-input").value;
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
let form2 = document.querySelector("#current-location-button");
form.addEventListener("click", showLocation);

/* function changeToCelcius(event) {
  event.preventDefault();
  let toCelcius = document.querySelector("#actual-temperature");
  toCelcius.innerHTML = "15??C";
}
let convertToCelcius = document.querySelector("#celcius-link");
convertToCelcius.addEventListener("click", changeToCelcius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let toFahrenheit = document.querySelector("#actual-temperature");
  toFahrenheit.innerHTML = "59?? F";
}
let clickToFahrenheit = document.querySelector("#fahrenheit-link");
clickToFahrenheit.addEventListener("click", changeToFahrenheit);*/
