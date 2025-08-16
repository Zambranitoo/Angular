import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherTranslateService {
  private weatherTranslations: { [key: string]: string } = {
  'clear sky': 'Despejado',
  'few clouds': 'Pocas nubes',
  'scattered clouds': 'Nubes dispersas',
  'broken clouds': 'Nubes fragmentadas',
  'overcast clouds': 'Nublado',
  'shower rain': 'Chubascos',
  'rain': 'Lluvia',
  'light rain': 'Lluvia ligera',
  'moderate rain': 'Lluvia moderada',
  'heavy intensity rain': 'Lluvia intensa',
  'thunderstorm': 'Tormenta',
  'snow': 'Nieve',
  'mist': 'Niebla',
  'drizzle': 'Llovizna',
  'fog': 'Niebla',
  'haze': 'Calina',
  'smoke': 'Humo',
  'dust': 'Polvo',
  'sand': 'Arena',
  'ash': 'Ceniza',
  'squall': 'Chubasco fuerte',
  'tornado': 'Tornado'
};

  translate(desc: string): string {
    return this.weatherTranslations[desc.toLowerCase()] || desc;
  }
}
