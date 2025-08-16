import { TestBed } from '@angular/core/testing';
import { WeatherTranslateService } from './weather-translate.service';

describe('WeatherTranslateService', () => {
  let service: WeatherTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
