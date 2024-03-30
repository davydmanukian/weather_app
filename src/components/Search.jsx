import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useState } from 'react';

const Search = ({units, setUnits, setQuery}) => {
    const [city, setCity] = useState("")

    const handleSearch = () => {
        if(city !== "") {
            setQuery({q: city})
        }
    }

    const searchMyLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                setQuery({
                    lat,
                    lon
                })
            })
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
      };

  return (
    
    <div className="flex items-center justify-between my-3 mx-6 bg-white border min-w-[300px] max-w-[800px] h-8 outline-none rounded-3xl">
        <div>
            <SearchIcon 
                onClick={handleSearch}
                className='ml-1 cursor-pointer hover:border hover:rounded-full hover:bg-[#2D2A54] hover:text-white transition ease-out hover:scale-125'
            />
            <input 
                value={city}
                onKeyPress={handleKeyPress}
                onChange={(e) => setCity(e.currentTarget.value)}
                type="text"
                placeholder='search for city...'
                className="outline-none capitalize ml-2"/>
        </div>
        <div>
            <LocationOnOutlinedIcon 
                onClick={searchMyLocation}
                className="mr-1 cursor-pointer hover:border hover:rounded-full hover:bg-[#2D2A54] hover:text-white transition ease-out hover:scale-125"
            />
        </div>
    </div>
  )
}

export default Search