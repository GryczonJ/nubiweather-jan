import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
    readonly apiKey:string= '';
    constructor(private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('WEATHER_API_KEY')|| '';
    }


    /**
     * aktualną pogodę w Gliwicach i Hamburgu
     * https://www.weatherapi.com/api-explorer.aspx
     */
    async getRealtimeWeather( location:string = 'Gliwice', aqi:string = 'yes') {
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&aqi=${aqi}`;
        
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('❌ Błąd pobierania danych pogodowych:', error.message);
            throw new Error('Nie udało się pobrać aktualnej pogody');
        }
    }

    /**
     * prognozę pogody na kolejne dni dla Gliwic i Hamburga
     */
    async getForecastWeather(location:string = 'Gliwice', days:number = 14,  aqi:string = 'yes', alerts:string = 'no') {

        //https://api.weatherapi.com/v1/forecast.json?key=8f73107b31cb4c3e8fb101708250307&q=Gliwice&days=14&aqi=yes&alerts=no
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=${aqi}&alerts=${alerts}`;
        
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('❌ Błąd pobierania danych:', error.message);
            throw new Error('Nie udało się pobrać prognozy pogody');
        }
    }
}
