import React, {useEffect, useState} from 'react'
import {Button, TextField } from '@mui/material';
import '../cssFiles/WeatherByHourTile.css';



const weatherByDayTile = ({min, max, icon, timezone, day}) => {

    function convertToTimezone(){
        const currentUTCms = Date.now();

        const adjUTC = currentUTCms + (timezone * 1000); 

        const adjUTCDate = new Date(adjUTC);

        let dayOfWeek = adjUTCDate.getUTCDay();
        dayOfWeek += day;
        if (dayOfWeek > 6){
            dayOfWeek = dayOfWeek - 7; 
        }

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = daysOfWeek[dayOfWeek];

        return dayName; 
    }
    
    const dayOfWeekName = convertToTimezone(); 

    const urlIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    return (
        <>
            <div className='hourRow'>
                <h5 className ="dailyF">{dayOfWeekName} </h5>
                <p className = "hourlyWeatherP"> H: {max}&deg;F L: {min}&deg;F </p>  <img className = "icon" src={urlIcon}></img>
            </div>
        </>

    )

};

export default weatherByDayTile;