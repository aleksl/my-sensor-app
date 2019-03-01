import { TestBed } from '@angular/core/testing';

import { SensorDustService } from './sensor-dust.service';

describe('SensorDustService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorDustService = TestBed.get(SensorDustService);
    expect(service).toBeTruthy();
  });
});
