import React, {useEffect, useState} from 'react'
import {Button, TextField } from '@mui/material';
import '../cssFiles/GetInfo.css'


const GetInfo = ({city, setCity, latitude, setLatitude, longitude, setLongitude}) => {

    const API_KEY = import.meta.env.VITE_Open_Weather_API


    const processInput = async (event) => {
        event.preventDefault();
        const cityName = event.target.elements.city.value.trim(); // Extract the city name from the input field
        
        
        const url = new URL("http://api.openweathermap.org/geo/1.0/direct?")

        url.searchParams.append("q", cityName);
        url.searchParams.append("limit", 1)
        url.searchParams.append("appid", API_KEY)

        try{
            const response = await fetch(url);
            const data = await response.json();

            if(data.length > 0){
                setCity(data[0].name);
                setLatitude(data[0].lat);
                setLongitude(data[0].lon);
            } else {
                window.alert("Could not find a valid city for your input")
            }
        } catch (error){
            console.log("Error getting lat and long data")
        }        
    }

    return (
        <div>
            <div className = "getInfoM">
                <h1>Weather App</h1>
                <p>Welcome, please enter a city:</p>
                <form className = 'cityForm' onSubmit = {processInput}>
                    <TextField className = 'textbox' type = "text" name = 'city'></TextField>
                    <Button variant="contained" type = "submit">Go</Button>
                </form>
            </div>
        </div>
    )

};

export default GetInfo;