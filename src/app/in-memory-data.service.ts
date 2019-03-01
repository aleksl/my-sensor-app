import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sensors } from './Sensors';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sensors = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {sensors};
  }

  // Overrides the genId method to ensure that a sensor always has an id.
  // If the sensors array is empty,
  // the method below returns the initial number (11).
  // if the sensors array is not empty, the method below returns the highest
  // sensor id + 1.
  genId(sensors: Sensors[]): number {
    return sensors.length > 0 ? Math.max(...sensors.map(sensor => sensor.id)) + 1 : 11;
  }
}