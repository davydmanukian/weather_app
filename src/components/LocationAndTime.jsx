import React from 'react'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'

const LocationAndTime = ({units,setUnits, weather: {
    details, icon, name,lat, lon, country, dt, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone
}}) => {

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if(units !== selectedUnit) {
        setUnits(selectedUnit)
    }
}

  return (
    <div className='flex flex-col my-3 h-[1vh]'>
        <div className='flex justify-center items-center flex-col'>
            <h1 className="text-white font-bold text-3xl">{name},{country}</h1>
            <p className='text-white text-sm'>{formatToLocalTime(dt, timezone)}</p>
        </div>
        <div className='flex flex-col justify-between items-center'>
            <img className="size-60" src={iconUrlFromCode(icon)} alt="" />
            <p className="text-xl mb-2 text-white">{details}</p>
            <p className="text-5xl mb-2 text-white">{`${temp.toFixed()}°`}{units === "metric" ? "C" : "F"}</p>
            <p className='text-white font-light'>{temp_min.toFixed()}/{temp_max.toFixed()}°{units === "metric" ? "C" : "F"}</p>
        </div>
        <div className='flex mt-20 text-white font-light flex-col items-center justify-between'>
          <p>Sunrise: {formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
          <p>Sunset: {formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
          <p>Feels like: {feels_like.toFixed()}°{units === "metric" ? "C" : "F"}</p>
        </div>
        <div className="mt-20 flex flex-row items-center justify-center">
            <button name="metric" className="text-xl font-light text-white transition ease-out hover:scale-125" onClick={handleUnitsChange}>°C</button>
            <p className="text-xl text-white mx-1">|</p>
            <button name='imperial' className="text-xl font-light text-white transition ease-out hover:scale-125" onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default LocationAndTime