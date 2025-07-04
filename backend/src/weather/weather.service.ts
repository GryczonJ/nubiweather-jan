import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
    constructor(private configService: ConfigService) {}

    /**
     * aktualną pogodę w Gliwicach i Hamburgu
     * https://www.weatherapi.com/api-explorer.aspx
     */
    getRealtimeWeather() {
        var https = require('https');
      
        const apiKey = this.configService.get<string>('WEATHER_API_KEY');
        const location = 'Gliwice'; 
        const aqi = 'no';
  
        const url = `/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=${aqi}`;

        const options = {
            host: 'api.weatherapi.com',
            path: url,
            method: 'GET'
        };

        const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                console.log(`🌤 Pogoda w ${json.location.name}, ${json.location.country}:`);
                console.log(`   Temperatura: ${json.current.temp_c}°C`);
                console.log(`   Warunki: ${json.current.condition.text}`);
                console.log(`   Wilgotność: ${json.current.humidity}%`);
                console.log(`   Wiatr: ${json.current.wind_kph} km/h, kierunek: ${json.current.wind_dir}`);
            } catch (err) {
                console.error('❌ Błąd parsowania JSON:', err.message);
            }
        });
    });

        req.on('error', (err) => {
            console.error('❌ Błąd zapytania:', err.message);
        });

        req.end();
    }

    /**
     * prognozę pogody na kolejne dni dla Gliwic i Hamburga
     */
    getForecastWeather() {
        // Simulate fetching forecast weather data
        return [
            {date: '2023-10-01', temperature: 20, condition: 'Cloudy'},
            {date: '2023-10-02', temperature: 18, condition: 'Rainy'},
            {date: '2023-10-03', temperature: 22, condition: 'Sunny'},
        ];
    }
}
