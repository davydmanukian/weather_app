import { useEffect, useState } from 'react';
import './App.css'
import LocationAndTime from './components/LocationAndTime';
import getFormattedWeatherData from './services/weatherService';
import Search from './components/Search';
import DailyForecast from './components/DailyOrHourlyForecast';
import Higlights from './components/Highlights';
import OtherCities from './components/OtherCities';

function App () {
  const [daily, setDaily] = useState("Daily")
  const [query, setQuery] = useState({q: "london"})
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units})
      .then(data => {
        setWeather(data)
        console.log(data);
      })
      
    }
  
    fetchWeather()
  }, [query, units])
  return (
    <div className='mx-auto flex '>
      <div className='w-1/3 bg-[#2D2A54] '>
        {weather && <LocationAndTime units={units} setUnits={setUnits} weather={weather} />}
      </div>
      <div className='flex flex-col gap-8 w-2/3 bg-[#D7D8F0]'>
        <Search units={units} setUnits={setUnits} setQuery={setQuery}/>
        {weather && <DailyForecast setDaily={setDaily} title={daily} units={units} items={daily === "Daily" ? weather.daily : weather.threeHourForecast} />}
        {weather && <Higlights units={units} weather={weather} title={"Today's Highlightes"}/>}
        <div className='mx-6'>
          <span>
              <p className="border-b-2 border-[#2D2A54] w-32 text-[#2D2A54]">Other Cities</p>
          </span>
          <div className="flex flex-row mt-5 items-center justify-around min-w-[300px] max-w-[900px]">
            <OtherCities setQuery={setQuery} city="paris" units={units} img="https://media.cntraveler.com/photos/592da6f1edb00428eb63d4b2/master/w_960%2Cc_limit/eiffel-GettyImages-490188084.jpg" />
            <OtherCities setQuery={setQuery} city="barcelona" units={units} img="https://media.istockphoto.com/id/1301579230/photo/spanish-cities-the-sacred-barcelona-family.jpg?s=612x612&w=0&k=20&c=SoKAwh7wqsRSfhQIcRdzdiLF30DkdSrqSoFbZg4n7o8="/>
            <OtherCities setQuery={setQuery} city="tokyo" units={units} img="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1663763125.jpg"/>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default App;
