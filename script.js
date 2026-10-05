async function getWeather(cityFromStorage = null) {

    let cityInput = document.getElementById("cityInput");

    let cityName = cityFromStorage || cityInput.value.trim();

    const API_Key = "fb53a44adee83a9ec588b3508b0d0969";

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        let weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_Key}&units=metric`
        );

        let weatherData = await weatherResponse.json();

        if (weatherResponse.ok === false) {
            alert("City not found");
            return;
        }


        localStorage.setItem("lastCity", weatherData.name);

        cityInput.value = weatherData.name;


        let temperature = weatherData.main.temp;
        let humidity = weatherData.main.humidity;
        let feelsLike = weatherData.main.feels_like;
        let pressure = weatherData.main.pressure;

        let windSpeed = weatherData.wind.speed;

        let condition = weatherData.weather[0].main;
        let description = weatherData.weather[0].description;

        let iconCode = weatherData.weather[0].icon;



        document.getElementById("city").textContent =
            `${weatherData.name}, ${weatherData.sys.country}`;


        document.getElementById("temperature").textContent =
            `${Math.round(temperature)}°C`;


        document.getElementById("condition").textContent =
            condition;


        document.getElementById("humidity").textContent =
            `${humidity}%`;


        document.getElementById("Wind").textContent =
            `${windSpeed} m/s`;


        document.getElementById("feelsLike").textContent =
            `${Math.round(feelsLike)}°C`;


        document.getElementById("presure").textContent =
            `${pressure} hPa`;


        let icon = getWeatherIcon(iconCode);

        document.querySelector("#weatherbox div").textContent =
            icon;

    }

    catch (error) {

        console.log("Error:", error);

        alert("Something went wrong. Please try again.");

    }
}


function getWeatherIcon(iconCode) {

    if (iconCode === "01d") {
        return "☀️";
    }

    if (iconCode === "01n") {
        return "🌙";
    }

    if (iconCode === "02d") {
        return "🌤️";
    }

    if (iconCode === "02n") {
        return "☁️";
    }

    if (iconCode === "03d" || iconCode === "03n") {
        return "☁️";
    }

    if (iconCode === "04d" || iconCode === "04n") {
        return "☁️";
    }

    if (iconCode === "09d" || iconCode === "09n") {
        return "🌧️";
    }

    if (iconCode === "10d") {
        return "🌦️";
    }

    if (iconCode === "10n") {
        return "🌧️";
    }

    if (iconCode === "11d" || iconCode === "11n") {
        return "⛈️";
    }

    if (iconCode === "13d" || iconCode === "13n") {
        return "❄️";
    }

    if (iconCode === "50d" || iconCode === "50n") {
        return "🌫️";
    }

    return "🌤️";
}


document.addEventListener("keydown", function (event) {

    let cityInput = document.getElementById("cityInput");


    if (document.activeElement === cityInput) {

        if (event.key === "Enter") {
            getWeather();
        }

        return;
    }


    if (event.key.length === 1) {

        cityInput.focus();

        cityInput.value += event.key;

    }


    if (event.key === "Enter") {

        getWeather();

    }

});


window.addEventListener("load", function () {

    let lastCity = localStorage.getItem("lastCity");

    if (lastCity) {

        getWeather(lastCity);

    }

});