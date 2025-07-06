import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
    constructor(private configService: ConfigService) {}

    /**
     * aktualną pogodę w Gliwicach i Hamburgu
     * https://www.weatherapi.com/api-explorer.aspx
     */
    getRealtimeWeather( city:string = 'Gliwice') {
        var https = require('https');
      
        const apiKey = this.configService.get<string>('WEATHER_API_KEY');
        const location = 'Gliwice'; 
        const aqi = 'yes';
  
        const url = `/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=${aqi}`;

        const options = {
            host: 'api.weatherapi.com',
            path: url,
            method: 'GET'
        };
       
        const req = https.request(options, (res) => {
        let data = '';
        // let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                return JSON.parse(data);
                // const json = JSON.parse(data);
                // console.log(`🌤 Pogoda w ${json.location.name}, ${json.location.country}:`);
                // console.log(`   Temperatura: ${json.current.temp_c}°C`);
                // console.log(`   Warunki: ${json.current.condition.text}`);
                // console.log(`   Wilgotność: ${json.current.humidity}%`);
                // console.log(`   Wiatr: ${json.current.wind_kph} km/h, kierunek: ${json.current.wind_dir}`);
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
    getForecastWeather(location:string = 'Gliwice', days:number = 14) {
        
        var https = require('https');
      
        const apiKey = this.configService.get<string>('WEATHER_API_KEY');
        const aqi = 'yes';
        const alerts = 'no';
        //https://api.weatherapi.com/v1/forecast.json?key=8f73107b31cb4c3e8fb101708250307&q=Gliwice&days=14&aqi=yes&alerts=no
        const url = `/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=${aqi}&alerts=${alerts}`;
        
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
                
                //const json = JSON.parse(data);
                return  JSON.parse(data);
                //Dane bieżące
                // const current = json.current;
                // const location = json.location;
                // const forecast = json.forecast.forecastday[0].day;
                // const air = current.air_quality;

                // console.log(`🌤 Pogoda w ${location.name}, ${location.country}:`);
                // console.log(`   Temperatura: ${current.temp_c}°C (odczuwalna: ${current.feelslike_c}°C)`);
                // console.log(`   Warunki: ${current.condition.text}`);
                // console.log(`   Wilgotność: ${current.humidity}%`);
                // console.log(`   Wiatr: ${current.wind_kph} km/h, kierunek: ${current.wind_dir}`);
                // console.log(`   Zachmurzenie: ${current.cloud}%`);
                // console.log(`   Jakość powietrza: PM2.5: ${air.pm2_5.toFixed(1)} µg/m³, PM10: ${air.pm10.toFixed(1)} µg/m³`);

                // // Prognoza dzienna
                // console.log(`📅 Prognoza na dziś:`);
                // console.log(`   Max temp: ${forecast.maxtemp_c}°C, Min temp: ${forecast.mintemp_c}°C`);
                // console.log(`   Opady: ${forecast.totalprecip_mm} mm`);
                // console.log(`   Średnia wilgotność: ${forecast.avghumidity}%`);
                // console.log(`   Śr. UV: ${forecast.uv}`);

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
}
