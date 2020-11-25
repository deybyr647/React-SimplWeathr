const dotenv = require('dotenv');
dotenv.config();

const key = process.env.REACT_APP_OWM_API_KEY;

const getCurrentWeather = (zip = 10001) => {
    //console.log(key);

    let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&lang=en&units=imperial`;

    fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            console.log("Current Weather Data: \n", data);
            return data;
        })
}

const getWeatherForecast = (zip = 10001) => {
    let endpoint = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${key}&lang=en&units=imperial&`;

    fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            console.log("Weather Forecast Data: \n", data)
            return data;
        })
}

export {getCurrentWeather, getWeatherForecast};