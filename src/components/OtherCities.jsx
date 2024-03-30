import React, { useEffect, useState } from 'react'
import getFormattedWeatherData, { formatToLocalTime } from '../services/weatherService'

const OtherCities = ({units, setQuery, city, img}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
          await getFormattedWeatherData({q: city, units})
          .then(data => {
            setWeather(data)

          })
          
        }
      
        fetchWeather()
      }, [units])



  return (        
        <div onClick={() => setQuery({q: city})} className='relative mb-2.5 flex object-cover flex-col items-center justify-between m-1 min-w-[130px] w-[200px] h-[150px] border bg-[#2D2A54] rounded-3xl cursor-pointer transition ease-out hover:scale-110 bg'>
            <img className='object-fill opacity-70 h-[100%] w-[100%] rounded-3xl' src={img} alt="" />
            {weather && <h1 className="text-white absolute text-xs right-2">{formatToLocalTime(weather.dt, weather.timezone, "hh:mm a")}</h1>}
            <h1 className="absolute capitalize top-20 text-white">{city}</h1>
            {weather && <h1 className="absolute top-28 text-white">{weather.temp.toFixed()}°{units === "metric" ? "C" : "F"}</h1>}
        </div>          
  )
}

export default OtherCities