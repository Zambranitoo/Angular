export interface Weather {
  city: string;
  latitude: number;
  longitude: number;
  humidity: number;
  pressure: number;
  temperature: number;
  description: string;
  icon: string;
  windSpeed?: number;
  feelsLike?: number;
  main: string;
}
