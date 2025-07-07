import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

//http://localhost:3000/weather/
@Controller('weather')//
export class WeatherController {
    private readonly weatherService: WeatherService;
    constructor(weatherService: WeatherService) {
        this.weatherService = weatherService;
    }
//http://localhost:3000/weather/realtime-weather
    @Get('realtime-weather')
    getRealtimeWeather(
        @Query('location') location:string = 'Gliwice') 
    {
        return this.weatherService.getRealtimeWeather(location);
    }

//http://localhost:3000/weather/forecast-weather`
    @Get('forecast-weather')
    getForecastWeather(
        @Query('location')location:string = 'Gliwice', 
        @Query('days') days:number = 14) 
    {
        return this.weatherService.getForecastWeather(location, days);
    }
}
