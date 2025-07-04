import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({
        envFilePath: '.env',
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
