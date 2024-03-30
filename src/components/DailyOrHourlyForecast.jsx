import { useState } from 'react'
import { iconUrlFromCode } from '../services/weatherService'
import { Popover } from '@mui/material'

const DailyForecast = ({title, items, units, setDaily}) => {   
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const handleClick = (event, item) => {
      setAnchorEl(event.currentTarget);
      setSelectedItem(item);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedItem(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <div className='mx-6'>
        <span>
            <p className="border-b-2 text-[#2D2A54] border-[#2D2A54] w-32"><span className={`${title === "Daily" ? "text-white" : ""} cursor-pointer`} onClick={() => setDaily("Daily")}>Daily</span> / <span className={`${title === "Hourly" ? "text-white" : ""} cursor-pointer`} onClick={() => setDaily("Hourly")}>Hourly</span></p> 
        </span>
        <div className="flex flex-row mt-5 items-center justify-around min-w-[300px]">
            {items && (
                items.map((item, i) => (
                    < >
                    <div onClick={(event) => handleClick(event, item)} key={item.title} className={"flex flex-col items-center justify-around h-32 w-24 rounded-2xl bg-[#D7D8F0] text-[#2D2A54] border-0 cursor-pointer transition ease-out hover:scale-110 drop-shadow-lg hover:z-10 hover:bg-[#2D2A54] hover:text-[#D7D8F0]"}>
                        <img 
                            src={iconUrlFromCode(item.icon)} 
                            alt=""  
                            className="w-12 my-1"
                        /><p className="font-light text-sm">
                            {item.title}
                        </p>
                        <p className="font-medium">
                            {item.temp.toFixed()}°{units === "metric" ? "C" : "F"}
                        </p>
                    </div>
                    <Popover
                    id={id}
                    open={open && selectedItem === item}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    {selectedItem === item && (
                      <div style={{ padding: '10px' }}>
                        <h1>Feels like: {item.feels_like.toFixed()}°{units === "metric" ? "C" : "F"}</h1>
                        <h1>Temp min: {item.temp_min.toFixed()}°{units === "metric" ? "C" : "F"}</h1>
                        <h1>Temp max: {item.temp_max.toFixed()}°{units === "metric" ? "C" : "F"}</h1>
                        <h2>Wind speed: {item.wind_speed.toFixed()}{units === "metric" ? "m/s" : "mph"}</h2>
                      </div>
                    )}
                  </Popover>
                  </>
                ))
                
            )}
        </div>
    </div>
  )
}

export default DailyForecast