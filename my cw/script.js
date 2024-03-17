const apiKey = "42e3ab94d7f24fdf83751608241603";
const apiUrl = "https://api.weatherapi.com/v1/current.json?";

const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("btn");

searchBtn.addEventListener("click", () => {
    checkWeather();
});

async function checkWeather() {
    const response = await fetch(apiUrl + `key=${apiKey}` + `&q=${searchBox.value}`);
    const data = await response.json();

    console.log(data);

    document.getElementById("city").textContent = data.location.name;
    document.getElementById("temp").textContent = data.current.temp_c + "°C";
    document.getElementById("status").textContent = data.current.condition.text;
    document.getElementById("date").textContent = today;
    document.getElementById("location").textContent = data.location.tz_id;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("wind").textContent = data.current.wind_kph;
    document.getElementById("condition").textContent = data.current.condition.text;
    document.getElementById("region").textContent = data.location.region;
    document.getElementById("country").textContent = data.location.country;
    document.getElementById("lon").textContent = data.location.lon;
    document.getElementById("lat").textContent = data.location.lat;

    const nlat = data.location.lat;
    const nlon = data.location.lon;

}
checkWeather();

//-----------time------------

function updateLocalTime() {
    const localTimeElement = document.getElementById("time");
    const now = new Date();
    const localTimeString = now.toLocaleTimeString();

    localTimeElement.textContent = localTimeString;
}

updateLocalTime();
setInterval(updateLocalTime, 1000);

//-----------date-----------

function getCurrentDate() {
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return `${currentDay}-${currentMonth}-${currentYear}`;
}
const today = getCurrentDate();
console.log(today);

//-----------day-----------

function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return daysOfWeek[currentDayIndex];
}

function displayCurrentDay() {
    const currentDayElement = document.getElementById("day");
    const currentDay = getCurrentDay();
    currentDayElement.textContent = currentDay;
}

displayCurrentDay();

//-----------weatherForecast------------



async function getUpcomingWeather(city) {

    //console.log(today);

    const dateIds = ["d8", "d9", "d10"];
    const iconIds = ["icon8", "icon9", "icon10"];
    const stsIds = ["st8", "st9", "st10"];

    const apiUrl = "https://api.weatherapi.com/v1/forecast.json?";

    for (let i = 0; i < 3; i++) {

        const upcoming = i + 1;
        console.log(upcoming);
        const Date_s = new Date();
        const nextDay = new Date(Date_s);
        nextDay.setDate(Date_s.getDate() + upcoming);

        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day = String(nextDay.getDate()).padStart(2, '0');

        const dateString = `${year}-${month}-${day}`;

        const response = await fetch(`apiURL + key=${apiKey} + &q=${city} + &dt=${formattedDate}`);
        var newData = await response.json();

        document.getElementById(dateIds[i]).innerHTML = newData.forecast.forecastday[0].date;
        document.getElementById(stsIds[i]).innerHTML = newData.forecast.forecastday[0].day.condition.text + " - " + newData.forecast.forecastday[0].day.avgtemp_c + "°C";

        const imgElement = document.createElement('img');
        imgElement.src = newData.current.condition.icon;

        const weatherIconDiv = document.getElementById(iconIds[i]);
        weatherIconDiv.innerHTML = '';
        weatherIconDiv.appendChild(imgElement);

        console.log(newData);

    }
}

searchBtn.addEventListener("click", () => {
    getUpcomingWeather(searchBox.value);
})
getUpcomingWeather();

//--------------------------------------


async function latestWeather(city) {

    const datesId = ["1", "d2", "d3", "d4", "d5", "d6", "d7"];
    //const iconsId = ["icon1", "icon2", "icon3", "icon4", "icon5", "icon6", "icon7"];
    const statusId = ["st8", "st9", "st10"];


    const URL = "https://api.weatherapi.com/v1/history.json?";


    for (let i = 0; i < 7; i++) {
        const ago = i + 1;
        console.log("Days ago:", last);
        const date = new Date();
        const pastDay = new Date(date);
        pastDay.setDate(date.getDate() - last);

        const year = pastDay.getFullYear();
        const month = String(pastDay.getMonth() + 1).padStart(2, '0');
        const day = String(pastDay.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month} -${day}`;
        console.log("Past day:", formattedDate);


        const response = await fetch(URL + `key=${apiKey} + & q=${city} + & dt=${formattedDate}`);
        var nData = await response.json();

        document.getElementById(datesId[i]).innerHTML = nData.forecast.forecastday[0].date;
        document.getElementById(statusId[i]).innerHTML = nData.forecast.forecastday[0].day.condition.text + " - " + nData.forecast.forecastday[0].day.avgtemp_c + "°C";

        console.log(nData);
    }


}

searchBtn.addEventListener("click", () => {
    latestWeather(searchBox.value);
})

latestWeather();

//--------map----------------

var map;
function initializeMap(nlat, nlon) {
    if (map) {

        map.remove();
    }
    map = L.map('map').setView([latitude, longitude], 13); // Set initial coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map); // Add a marker at specified coordinates
}