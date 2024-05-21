import { TextField } from '@mui/material';
import React, {useEffect, useState} from 'react'
import GetInfo from './GetInfo';
import WeatherDisplay from './WeatherDisplay';

const WeatherApp = () => {

    //Initialize all states 
    const [city, setCity] = useState(''); 
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);



    //Set up API 
    const API_KEY = import.meta.env.VITE_Open_Weather_API
    
    //Get data
    const fetchGeoPosition = async () => {
        const response = await fetch()
    }



    return (
        <>
            {city === '' ? (
                <GetInfo city = {city} setCity = {setCity} latitude = {latitude} setLatitude = {setLatitude} longitude = {longitude} setLongitude = {setLongitude}></GetInfo>
            ) : (
               <WeatherDisplay city = {city} lat = {latitude} lon = {longitude}></WeatherDisplay>
            )}
        </>
    );
};

export default WeatherApp;