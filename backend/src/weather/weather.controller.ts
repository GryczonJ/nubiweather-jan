import { Controller, Get } from '@nestjs/common';
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
    getRealtimeWeather() {
        return this.weatherService.getRealtimeWeather();
    }

//http://localhost:3000/weather/forecast-weather`
    @Get('forecast-weather')
    getForecastWeather() {
        return this.weatherService.getForecastWeather();
    }
}
