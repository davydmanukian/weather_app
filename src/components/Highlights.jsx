import {
  UilTear,
  UilWind,
  UilEye
} from "@iconscout/react-unicons";

const Higlights = ({units, title, weather: {humidity, speed, visibility}}) => {
  return (
    <div className='mx-6'>
        <span>
            <p className="border-b-2 border-[#2D2A54] w-32 text-[#2D2A54]">{title}</p>
        </span>
        <div className="flex flex-row mt-5 items-center justify-around min-w-[300px] max-w-[900px]">
            <div className='flex flex-col items-center justify-between m-1 min-w-[130px] w-[200px] h-[150px] border bg-[#2D2A54] rounded-3xl cursor-pointer transition ease-out hover:scale-110 '>
              <div className="flex m-1 items-center text-[#D7D8F0]">
                <UilTear size={30} className="mr-1"/>
                Humidity
              </div>
              <p className="font-light text-xs m-1 text-[#D7D8F0]">Todays Humidity</p>
              <span className="text-3xl text-[#D7D8F0]">{`${humidity.toFixed()}`}<span className="text-2xl text-[#D7D8F0]">%</span> </span>
            </div>
            <div className='flex flex-col items-center justify-between m-1 min-w-[130px] w-[200px] h-[150px] border bg-[#2D2A54] rounded-3xl cursor-pointer transition ease-out hover:scale-110'>
              <div className="flex m-1  items-center text-[#D7D8F0]">
                <UilWind size={30} className="mr-1"/>
                Wind Status
              </div>
              <p className="font-light text-xs m-1 text-[#D7D8F0]">Todays Wind Speed</p>
              <span className="text-3xl text-[#D7D8F0]">{`${speed.toFixed()}`}<span className="text-2xl text-[#D7D8F0]">{units === "metric" ? "m/s" : "mph"}</span> </span>
            </div>
            <div className='flex flex-col items-center justify-between m-1 min-w-[130px] w-[200px] h-[150px] border bg-[#2D2A54] rounded-3xl cursor-pointer transition ease-out hover:scale-110 '>
              <div className="flex m-1 items-center text-[#D7D8F0]">
                <UilEye size={30} className="mr-1"/>
                Visibility
              </div>
              <p className="font-light text-xs m-1 text-[#D7D8F0]">Todays Visibility</p>
              <span className="text-3xl text-[#D7D8F0]">{`${visibility}`}<span className="text-2xl text-[#D7D8F0]">m</span> </span>
            </div>
            
        </div>
        
    </div>
  )
}

export default Higlights