import "./style.css";
import {showTime} from "./modules/date";


const body = document.querySelector("#body");
const refreshBg = document.querySelector(".refresh-background");
const languageEn = document.querySelector(".language-button-en");
const languageRu = document.querySelector(".language-button-ru");
const temperatureF = document.querySelector(".temperature-button-farenheit");
const temperatureC = document.querySelector(".temperature-button-celsius");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const cityAndCountry = document.querySelector(".weather-city");
const dateTimeWeather = document.querySelector(".weather-date-and-time");
const temperatureNow = document.querySelector(".weather-temperature");
const weatherImg = document.querySelector(".weather-image");
const weatherDay = document.querySelector(".weather-day");
const forecastTemperature = document.querySelector(
  ".weather-forecast-temperature"
);
const forecastImg = document.querySelector(".weather-forecast-image");
const map = document.querySelector("#map");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
let posLatitude;
let posLongitude;
let address;
let city;

//--------refresh background----------------
const getLinkToImage = async () => {
  const url =
    "https://api.unsplash.com/photos/random?&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17";
  const response = await fetch(url);
  const data = await response.json();
  return data.urls.regular;
};

async function getBackground() {
  try {
    const backgroundLink = await getLinkToImage();
    body.style.backgroundImage = `url(${backgroundLink})`;
    body.style.transition = "1s";
  } catch (error) {
    console.error(error);
  }
}

refreshBg.addEventListener("click", getBackground);

//------------latitude------longitude----------------------------------

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude.textContent = `Longitude: ${position.coords.longitude.toFixed(
        2
      )}`;
      latitude.textContent = `Latitude: ${position.coords.latitude.toFixed(2)}`;
    });
  }
});

//-----date-time----------------------------------


showTime();

//----------------map---------------
function createMap() {
  navigator.geolocation.getCurrentPosition(showMap);
  function showMap(position) {
    posLatitude = position.coords.latitude.toFixed(2);
    posLongitude = position.coords.longitude.toFixed(2);
    getMap(posLatitude, posLongitude);
  }
}

createMap();

function getMap(posLatitude, posLongitude) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZ2Fub2NpaiIsImEiOiJja2pzZXQzdTEwMnpzMnNwOHR2M2drM2YzIn0.dXphpFRS-DDUvodGD7CR8g";
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
  });
}

//-----search------



 
//-------weather now-------


function pressEnter(e) {
    if (e.which == 13) {
     
    }
  }
//   searchButton.addEventListener('click', );
  window.addEventListener('keypress', pressEnter);

const urlWeather3days = "https://api.weatherbit.io/v2.0/forecast/daily?city=Moscow&country=RU&days=3&units=S&lang=be&key=90b5e2275b7d43458feb47f127520564";