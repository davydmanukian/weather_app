import { DateTime } from "luxon"

const API_KEY = "801eee02c56b1c5080929efae5fb2d0e"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})

    return fetch(url)
        .then(res => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed},
        visibility,
        timezone
    } = data

    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
        visibility,
        timezone
      };
    
}

const formatForecastWeather = (data) => {
    let { list: threeHourForecast } = data;
    let timezone = data.city.timezone

    let daily = [threeHourForecast[0],threeHourForecast[8],threeHourForecast[16],threeHourForecast[24],threeHourForecast[32]]
    console.log(data);
    daily = daily.map((day) => {
        return {
            title: formatToLocalTime(day.dt, timezone, "ccc"),
            temp: day.main.temp,
            temp_min: day.main.temp_min,
            temp_max: day.main.temp_max,
            feels_like: day.main.feels_like,
            wind_speed: day.wind.speed,
            icon: day.weather[0]["icon"]
        }
    }) 

    threeHourForecast = threeHourForecast.slice(0, 5).map((day) => {
        return {
            title: formatToLocalTime(day.dt, timezone, "hh:mm a"),
            temp: day.main.temp,
            temp_min: day.main.temp_min,
            temp_max: day.main.temp_max,
            feels_like: day.main.feels_like,
            wind_speed: day.wind.speed,
            icon: day.weather[0]["icon"],
            text: day.dt_txt
        }
    }) 
  
    return { threeHourForecast, daily };
  };

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams)
    .then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        units: searchParams.units,
    }).then(formatForecastWeather);
    console.log(formattedForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}

const formatToLocalTime = (seconds, zone, format = "cccc, dd LLL yyyy' | ' hh:mm a") => {
    let a = seconds + zone
    return DateTime.fromSeconds(a).setZone(zone/1000).toFormat(format)
}

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData

export { formatToLocalTime, iconUrlFromCode }