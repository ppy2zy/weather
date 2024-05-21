import React, {useEffect, useState} from 'react'
import {Button, TextField } from '@mui/material';


const currentWeather = ({weatherData}) => {

    //Setting up API and weatherData state the stores API feedback
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    useState(() => {
        if (weatherData) {
            setCurrentWeatherData(weatherData);
        }
    }, [weatherData]);

    return (
        <>
            { currentWeatherData && (
                <>
                    <h2>Weather in {currentWeatherData.name}</h2>
                    <h1>{Math.round(currentWeatherData.main.temp)}°</h1>
                    <p>H: {Math.round(currentWeatherData.main.temp_max)}° L: {Math.round(currentWeatherData.main.temp_min)}°</p>

                    <p>{currentWeatherData.weather[0].main}</p>

                </>
            )}
        </>
    )

};

export default currentWeather;