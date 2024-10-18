import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import search_icon from "./images/search.png";
import clear_icon from "./images/clear-icon.png";
import cloud_icon from "./images/cloud_icon.png";
import drizzle_icon from "./images/drizzle_icon.webp";
import rain_icon from "./images/rain_icon.png";
import snow_icon from "./images/snow_icon.avif";
import wind_icon from "./images/wind_icon.jpg";
import humidity_icon from "./images/humidity_icon.webp";


const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setweatherData] = useState("");

    const allIcons = {
        "01d": clear_icon,
        "01n":clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }
    const search = async (city) => {
        if (city === "") {
            alert("City name empty! Enter city name");
            return;
        }
        try {
            const url = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=68b0b5f0db57621f8d1e51cddcf907aa&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature:  Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setweatherData(false);
            console.error("Error in fetching weather data");
        }

    }

    useEffect(()=>{
        search("")
    },[])

    return (
    <div style={{width:'500px',height:'650px'}} className="weather">
      <div className="search-bar d-flex justify-content-center align-items-center">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)
        }/>
      </div>
      {weatherData ? <>
      <div id="all" className="all">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
        </div>
        </div>
        </div>
      </> : <></>}

    </div>
      
      
    
  );
};

export default Weather;