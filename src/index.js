import "./style.css";
import { showTime } from "./modules/date";
import { getBackground } from "./modules/refresh-bg";

const refreshBg = document.querySelector(".refresh-background");

const buttonEn = document.querySelector(".language-button-en");
const buttonRu = document.querySelector(".language-button-ru");
const buttonF = document.querySelector(".temperature-button-farenheit");
const buttonC = document.querySelector(".temperature-button-celsius");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const cityAndCountry = document.querySelector(".weather-city");
const temperatureNow = document.querySelector(".weather-temperature");
const feels_like = document.querySelector(".feelsLike");
const wind = document.querySelector(".speedWind");
const iconWeather = document.querySelector(".weather-image");
const humidity = document.querySelector(".humidity");
const overcast = document.querySelector(".overcast");

const firstTemp = document.querySelector(".first-forecast-temperature");
const secondTemp = document.querySelector(".second-forecast-temperature");
const thirdTemp = document.querySelector(".third-forecast-temperature");
const firstIcon = document.querySelector(".first-icon");
const secondIcon = document.querySelector(".second-icon");
const thirdIcon = document.querySelector(".third-icon");

let positionLatit;
let positionLongit;
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");

let address;
let placeName;
let country;
let isFarengeit = false;
let languageRu = false;

//-----search------

function pressEnter(e) {
  if (e.which === 13) {
    showCity();
  }
}





function getAddress(positionLatit, positionLongit) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${positionLatit}+${positionLongit}&key=f650e4b67c054cfd9c0224e9b3ddf880`
  ).then((response) => response.json());
}

// function adrespokaz (positionLatit, positionLongit) {
//   const pokaz = getAddress(positionLatit, positionLongit);
//   console.log(pokaz);
// }
// adrespokaz();

async function showAddress(positionLatit, positionLongit) {
  try {
    address = await getAddress(positionLatit, positionLongit);

    placeName = address.results[0].components.city;
    country = address.results[0].components.country;

    cityAndCountry.textContent = `${placeName}, ${country}`;
    showWeatherNow(placeName);
    showForecastWeather(placeName);
  } catch (error) {
    alert(error);
  }
}

function searchCity(placeName) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${placeName}&key=f650e4b67c054cfd9c0224e9b3ddf880`
  ).then((response) => response.json());
}

//   function minsk (){
//     placeName = "Murmansk";
//     const showMinsk = searchCity(placeName);
//     console.log(showMinsk);
//   }
// minsk();

async function showCity(placeName) {
  try {
    if (!placeName) {
      placeName = searchInput.value;
    }
    address = await searchCity(placeName);
    console.log(address);
    if (address) {
      const result = address.results[0].components;
      placeName = result.city
        ? result.city
        : result.town
        ? result.town
        : result.village;

      const { country } = result;
      cityAndCountry.textContent = `${placeName}, ${country}`;

      const pos = address.results[0].geometry;

      positionLatit = pos.lat.toFixed(2);
      positionLongit = pos.lng.toFixed(2);

      searchInput.value = "";
      showWeatherNow(placeName);
      showForecastWeather(placeName);
      getMap(positionLatit, positionLongit);
      getCoords(positionLatit, positionLongit);
    }
  } catch (error) {
    alert(error);
  }
}





//-----date-time----------------------------------

showTime();

//----------------map---------------

export function createMap() {
  navigator.geolocation.getCurrentPosition(showMap);
  function showMap(position) {
    positionLatit = position.coords.latitude.toFixed(2);
    positionLongit = position.coords.longitude.toFixed(2);
    getCoords(positionLatit, positionLongit);
    showAddress(positionLatit, positionLongit);
    getMap(positionLatit, positionLongit);
  }
}

function getMap(positionLatit, positionLongit) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZ2Fub2NpaiIsImEiOiJja2pzZXQzdTEwMnpzMnNwOHR2M2drM2YzIn0.dXphpFRS-DDUvodGD7CR8g";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [positionLongit, positionLatit],
    zoom: 13,
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([positionLongit, positionLatit])
    .addTo(map);
}

function getCoords(positionLatit, positionLongit) {
  const lat = String(positionLatit).split(".");
  const lon = String(positionLongit).split(".");
  const latDegree = lat[0];
  const latMinute = lat[1];
  const lonDegree = lon[0];
  const lonMinute = lon[1];
  latitude.textContent = `Latitude: ${latDegree}°  ${latMinute}'`;
  longitude.textContent = `Longitude: ${lonDegree}°  ${lonMinute}'`;
}
createMap();

//-------weather now-------

function getWeatherNow(placeName) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=8f688ccc6f525b68944b9eab6d340d1b`
  ).then((response) => response.json());
}
// function pokazpogoda() {
//   placeName = "Grodno";
//   const pokaz = getWeatherNow(placeName);
//   console.log(pokaz);
// }
// pokazpogoda();

async function showWeatherNow(placeName) {
  try {
    const weather = await getWeatherNow(placeName);

    const feelsLike = weather.main.feels_like;
    const humidityNow = weather.main.humidity;
    const tempNow = weather.main.temp;
    const iconNow = weather.weather[0].icon;
    const windNow = weather.wind.speed;

    temperatureNow.textContent = isFarengeit
      ? `${Math.round((tempNow - 273.15) * 1.8 + 32)}°`
      : `${Math.round(tempNow - 273.15)}°`;

    feels_like.textContent = isFarengeit
      ? `FEELS LIKE: ${`${Math.round((feelsLike - 273.15) * 1.8 + 32)}°`}`
      : `FEELS LIKE: ${`${Math.round(feelsLike - 273.15)}°`}`;

    humidity.textContent = `HUMIDITY: ${humidityNow}%`;
    wind.textContent = `WIND: ${windNow}m/s`;
    overcast.textContent = weather.weather[0].description;

    iconWeather.style.backgroundImage = `url(http://openweathermap.org/img/wn/${iconNow}@2x.png)`;
  } catch (error) {
    alert(error);
  }
}

//-----forecast 3 days-----
function getForecastWeather(placeName) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&appid=8f688ccc6f525b68944b9eab6d340d1b`
  ).then((response) => response.json());
}

// function showForecast() {
//   placeName = "Grodno";
//   const forecast = getForecastWeather(placeName);
//   console.log(forecast);
// }
// showForecast();

async function showForecastWeather(placeName) {
  try {
    const forecastWeather = await getForecastWeather(placeName);

    const firstTemperature = forecastWeather.list[9].main.temp;
    const secTemperature = forecastWeather.list[17].main.temp;
    const thirdTemperature = forecastWeather.list[25].main.temp;

    firstTemp.textContent = isFarengeit
      ? `${Math.round((firstTemperature - 273.15) * 1.8 + 32)}°`
      : `${Math.round(firstTemperature - 273.15)}°`;
    secondTemp.textContent = isFarengeit
      ? `${Math.round((secTemperature - 273.15) * 1.8 + 32)}°`
      : `${Math.round(secTemperature - 273.15)}°`;

    thirdTemp.textContent = isFarengeit
      ? `${Math.round((thirdTemperature - 273.15) * 1.8 + 32)}°`
      : `${Math.round(thirdTemperature - 273.15)}°`;

    firstIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${forecastWeather.list[9].weather[0].icon}@2x.png)`;
    secondIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${forecastWeather.list[17].weather[0].icon}@2x.png)`;
    thirdIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${forecastWeather.list[25].weather[0].icon}@2x.png)`;
  } catch (error) {
    alert(error);
  }
}

//change --------c f------

function activeFarenheit() {
  isFarengeit = true;
  buttonC.classList.remove("active");
  buttonF.classList.add("active");
  showWeatherNow(placeName);
  showForecastWeather(placeName);
  
}

function activeCelsius() {
  isFarengeit = false;
  buttonC.classList.add("active");
  buttonF.classList.remove("active");
  showWeatherNow(placeName);
  showForecastWeather(placeName);
  
}



// change language-------------

function activeRu() {
  languageRu = true;
  buttonEn.classList.remove("active");
  buttonRu.classList.add("active");
  showWeatherNow(placeName);
  showForecastWeather(placeName);
  
}

function activeEn() {
  languageRu = false;
  buttonEn.classList.add("active");
  buttonRu.classList.remove("active");
  showWeatherNow(placeName);
  showForecastWeather(placeName);
 
}

buttonRu.addEventListener("click", activeRu);
buttonEn.addEventListener("click", activeEn);
searchButton.addEventListener("click", ()=> {
  showCity();
});
window.addEventListener("keypress", pressEnter);
buttonF.addEventListener("click", activeFarenheit);
buttonC.addEventListener("click", activeCelsius);
refreshBg.addEventListener("click", getBackground);
window.addEventListener("load", getBackground);