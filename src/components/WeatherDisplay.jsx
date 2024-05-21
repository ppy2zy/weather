import React, { useEffect, useState } from 'react';
import { Container, Link, CardMedia,  Paper, Grid, Card, CardContent, Typography } from '@mui/material';
import CurrentWeather from './currentWeather';
import WeatherByHourTile from './WeatherByHourTile';
import WeatherByDayTile from './WeatherByDayTile';

import '../cssFiles/WeatherDisplay.css';

const WeatherDisplay = ({ city, lat, lon }) => {
    // Setting up API and weatherData state that stores API feedback
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [popularArticles, setPopularArticles] = useState([])
    const [timezone, setTimezone] = useState(null);

    const API_KEY = import.meta.env.VITE_Open_Weather_API;
    const API_KEY_NY = import.meta.env.VITE_NY_TIMES_API;

    // For fetching current weather data
    useEffect(() => {
        const fetchWeatherData = async () => {
            const url = new URL('https://api.openweathermap.org/data/2.5/weather?');
            url.searchParams.append('lat', lat);
            url.searchParams.append('lon', lon);
            url.searchParams.append('units', 'imperial');
            url.searchParams.append('appid', API_KEY);

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data) {
                    setWeatherData(data);
                }
            } catch (error) {
                console.log('There was an error fetching the data from the endpoint');
            }
        };

        fetchWeatherData();
    }, [lat, lon]);

    // For fetching weather data for next 24 hours
    useEffect(() => {
        const fetchHourlyForecast = async () => {
            const hourlyForecastUrl = new URL('https://pro.openweathermap.org/data/2.5/forecast/hourly?');
            hourlyForecastUrl.searchParams.append('lat', lat);
            hourlyForecastUrl.searchParams.append('lon', lon);
            hourlyForecastUrl.searchParams.append('units', 'imperial');
            hourlyForecastUrl.searchParams.append('appid', API_KEY);
            hourlyForecastUrl.searchParams.append('cnt', '24');

            console.log(hourlyForecastUrl);

            try {
                const response = await fetch(hourlyForecastUrl);
                const data = await response.json();

                if (data) {
                    setTimezone(data.city.timezone);
                    setHourlyForecast(data.list);
                }
            } catch (error) {
                console.log('There was an error getting hourly forecast data');
            }
        };

        fetchHourlyForecast();
    }, [lat, lon]);

    //Fetching data for next 7 days 
    useEffect(() => {
        const fetchDailyForecast = async () => {
            const dailyForecastUrl = new URL('https://api.openweathermap.org/data/2.5/forecast/daily?');
            dailyForecastUrl.searchParams.append('lat', lat);
            dailyForecastUrl.searchParams.append('lon', lon);
            dailyForecastUrl.searchParams.append('units', 'imperial');
            dailyForecastUrl.searchParams.append('appid', API_KEY);
            dailyForecastUrl.searchParams.append('cnt', '7');

            try {
                const response = await fetch(dailyForecastUrl);
                const data = await response.json();

                if (data) {
                    //setTimezone(data.city.timezone)
                    setDailyForecast(data.list)
                }
            } catch (error) {
                console.log('There was an error getting hourly forecast data');
            }
        };

        fetchDailyForecast();
    }, [lat, lon]);

    //Fetching NY times: https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yourkey
    useEffect(() => {
        const fetchArticles = async () => {
            const nyURL = new URL('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?');
            nyURL.searchParams.append('api-key', API_KEY_NY);

            try {
                const response = await fetch(nyURL);
                const data = await response.json();

                if (data) {
                    //Get the 5 most popular articles in the last day 
                    setPopularArticles(data.results.slice(0, 5));
                }
            } catch (error) {
                console.log('There was an error getting hourly forecast data');
            }
        };

        fetchArticles();
    }, []);


    return (
        <div className="weatherDisplayMain">
            <div className="currentWeatherInfo">
                {weatherData && <CurrentWeather weatherData={weatherData} />}
            </div>

            <div className="two-columns">
                <div className="left-column">
                    <h4 className = "header1">Hourly Forcast</h4>
                    <hr></hr>
                    <div>
                        {hourlyForecast.map((hour, index) => (
                            <WeatherByHourTile key = {index} temp = {hour.main.temp} icon = {hour.weather[0].icon} time = {hour.dt} timezone = {timezone}/>
                        ))}
                    </div>
                </div>

                <div className="right-column">
                    <h4 className = "header1">Daily Forcast</h4>
                    <hr></hr>

                    <div>
                        {dailyForecast.map((day, index) => (
                            <WeatherByDayTile key = {index} min = {Math.round(day.temp.min)} max = {Math.round(day.temp.max)} icon = {day.weather[0].icon} timezone = {timezone} day = {index}/>
                        ))}
                    </div>
                    <hr></hr>
                    <h4>Trending News</h4>
                    <Paper style={{ maxHeight: 600, maxWidth: 600, overflow: 'auto', display: 'block', margin: 'auto'}}>
                        {popularArticles.map((article, index) => (
                            <Card key={index}>
                                <CardContent>
                                    <Link href={article.url} underline="hover" color="black">
                                        <Typography variant="h5">{article.title}</Typography>
                                    </Link>
                                    <Typography variant="body2">{article.byline}</Typography>
                                </CardContent>
                                <CardMedia style={{ display: 'block', maxWidth: 70, maxHeight: 70, margin: 'auto' }}
                                    component="img"
                                    height="20"
                                    image={article.media[0]["media-metadata"][0].url}
                                />
                            </Card>
                        ))}
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
