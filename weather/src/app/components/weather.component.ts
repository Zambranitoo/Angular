import { Component, OnInit } from '@angular/core';
import { Weather } from '../models/weather';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../service/weather.service';
import { WeatherTranslateService } from '../service/weather-translate.service';
import { forkJoin } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [DecimalPipe, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  searchLocation: string = '';
  mockLocations: Weather[] = [];
  currentWeather: Weather | null = null;
  citySuggestions: any[] = [];
  allCities: string[] = [];

  locations = [
    { city: 'Chillán', country: 'CL' },
    { city: 'Santiago', country: 'CL' },
    { city: 'Valparaíso', country: 'CL' },
    { city: 'Concepción', country: 'CL' },
  ];

  constructor(
    private weatherService: WeatherService,
    private weatherTranslate: WeatherTranslateService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<{ cities: string[] }>('/assets/city.json')
      .subscribe({
        next: data => {
          this.allCities = data.cities;
        },
        error: err => {
          console.log('Error loading Chilean cities:', err);
        }
      });

    const requests = this.locations.map(loc =>
      this.weatherService.getWeather(loc.city, loc.country)
    );
    forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        this.mockLocations = responses.map(res => {
          const weatherMain = res.weather[0].main;
          const weatherDesc = res.weather[0].description;
          return {
            city: res.name,
            latitude: res.coord.lat,
            longitude: res.coord.lon,
            temperature: res.main.temp,
            description: this.weatherTranslate.translate(weatherDesc),
            icon: this.getWeatherIcon(weatherMain, weatherDesc),
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            windSpeed: res.wind.speed,
            feelsLike: res.main.feels_like,
            main: weatherMain
          };
        });
      },
      error: err => {
        console.log('Error al cargar clima:', err);
      }
    });
  }

  onInputChange(): void {
    const query = this.searchLocation.trim().toLowerCase();
    if (query.length > 0) {
      this.citySuggestions = this.allCities
        .filter(city =>
          city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        )
        .slice(0, 8);
    } else {
      this.citySuggestions = [];
    }
  }

  onSearch(): void {
    if (this.searchLocation.trim()) {
      const cityExists = this.allCities.some(city =>
        city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') ===
        this.searchLocation.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      );

      if (!cityExists) {
        this.currentWeather = {
          city: this.searchLocation,
          latitude: 0,
          longitude: 0,
          temperature: 0,
          description: 'Ciudad no encontrada en Chile',
          icon: 'fas fa-exclamation-triangle',
          humidity: 0,
          pressure: 0,
          windSpeed: 0,
          feelsLike: 0,
          main: ''
        };
        this.searchLocation = '';
        return;
      }

      this.weatherService.getWeather(this.searchLocation, 'CL').subscribe({
        next: (res: any) => {
          const weatherMain = res.weather[0].main;
          const weatherDesc = res.weather[0].description;
          this.currentWeather = {
            city: res.name,
            latitude: res.coord.lat,
            longitude: res.coord.lon,
            temperature: res.main.temp,
            description: this.weatherTranslate.translate(weatherDesc),
            icon: this.getWeatherIcon(weatherMain, weatherDesc),
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            windSpeed: res.wind.speed,
            feelsLike: res.main.feels_like,
            main: weatherMain
          };
        },
        error: () => {
          this.currentWeather = {
            city: this.searchLocation,
            latitude: 0,
            longitude: 0,
            temperature: 0,
            description: 'No encontrado',
            icon: 'fas fa-question-circle',
            humidity: 0,
            pressure: 0,
            windSpeed: 0,
            feelsLike: 0,
            main: ''
          };
        }
      });
      this.searchLocation = '';
    }
  }

  getWeatherIcon(main: string, description: string): string {
    if (main === 'Thunderstorm') return 'fas fa-bolt';
    if (main === 'Drizzle') return 'fas fa-cloud-rain';
    if (main === 'Rain') return 'fas fa-cloud-showers-heavy';
    if (main === 'Snow') return 'fas fa-snowflake';
    if (main === 'Clear') return 'fas fa-sun';
    if (main === 'Clouds') {
      if (description.includes('few')) return 'fas fa-cloud-sun';
      if (description.includes('scattered')) return 'fas fa-cloud';
      if (description.includes('broken') || description.includes('overcast')) return 'fas fa-cloud';
      return 'fas fa-cloud';
    }
    if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(main)) {
      return 'fas fa-smog';
    }
    return 'fas fa-question-circle';
  }

  getIconColor(main: string, description: string): string {
    if (main === 'Rain' && description.includes('light')) return 'text-info';
    if (main === 'Rain' && description.includes('heavy')) return 'text-primary';
    if (main === 'Rain') return 'text-info';
    if (main === 'Clouds' && description.includes('few')) return 'text-info';
    if (main === 'Clouds' && description.includes('broken')) return 'text-light';
    if (main === 'Clouds') return 'text-secondary';
    if (main === 'Clear') return 'text-warning';
    if (main === 'Snow') return 'text-info';
    if (main === 'Thunderstorm') return 'text-warning';
    if (['Mist', 'Smoke', 'Haze', 'Fog', 'Dust', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(main)) return 'text-muted';
    return 'text-white';
  }


  getTemperatureClass(temp: number): string {
    return 'text-white';
  }

  selectLocation(location: Weather): void {
    this.currentWeather = { ...location };
  }

  getTemperatureBackground(temp: number): string {
    if (temp < 10) return 'bg-primary bg-opacity-10';
    if (temp < 20) return 'bg-success bg-opacity-10';
    if (temp < 30) return 'bg-warning bg-opacity-10';
    return 'bg-danger bg-opacity-10';
  }
}
