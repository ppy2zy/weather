import React, {useEffect, useState} from 'react'
import {Button, TextField } from '@mui/material';
import '../cssFiles/WeatherByHourTile.css';



const weatherByHourTile = ({temp, icon, time, timezone}) => {

    function convertToTimezone(){
        const timeMilliseconds = time * 1000 + (1000 * timezone);
        const date = new Date(timeMilliseconds);

        const UTCDate = date.toUTCString();
        const hours = date.getUTCHours(); 
        if (hours < 12){
            if(hours == 0){
                return "12 AM"
            } else {
                return hours + " AM";
            }
        } else {
            //Hours need subracted from
            if(hours == 12){
                return "12 PM"
            } else {
                let newHours =  hours - 12;
                return newHours + " PM"
            }
        }
    }
    
    const UTCHours = convertToTimezone(); 
    const urlIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    return (
        <>
            <div className='hourRow'>
                <p className = "hourlyWeatherP">{UTCHours}   {Math.round(temp)}&deg;F </p>  <img className = "icon" src={urlIcon}></img>
            </div>
        </>
    )

};

export default weatherByHourTile;