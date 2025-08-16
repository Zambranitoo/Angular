import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKeyWeather: string = environment.apiKeyWeather
  URL: string = '';

  constructor(private http: HttpClient) {
    this.URL = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKeyWeather}&units=metric&q=`
  }

  getWeather(city: string, country: string) {
    return this.http.get(`${this.URL}${city},${country}`)
  }

  getCitySuggestions(query: string, country = 'CL') {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKeyWeather}`;
    return this.http.get<any[]>(url);
  }

}
