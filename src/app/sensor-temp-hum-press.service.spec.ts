import { TestBed } from '@angular/core/testing';

import { SensorTempHumPressService } from './sensor-temp-hum-press.service';

describe('SensorTempHumPressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorTempHumPressService = TestBed.get(SensorTempHumPressService);
    expect(service).toBeTruthy();
  });
});
