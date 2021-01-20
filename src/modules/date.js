const dateTimeWeather = document.querySelector(".weather-date-and-time");

export function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let d = today.getDay();
    let m = today.getMonth();
    let date = today.getDate();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
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
    dateTimeWeather.textContent = `${days[d]} ${date} ${
      months[m]
    }   ${hour}:${addZero(min)}:${addZero(sec)}`;
    setTimeout(showTime, 1000);
  }
  
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }
  
  
  