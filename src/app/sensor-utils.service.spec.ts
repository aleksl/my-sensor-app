import { TestBed } from '@angular/core/testing';

import { SensorUtilsService } from './sensor-utils.service';

describe('SensorUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorUtilsService = TestBed.get(SensorUtilsService);
    expect(service).toBeTruthy();
  });
});
