import { Component, OnInit } from '@angular/core';
import { Sensors } from '../Sensors';
import { SensorService } from '../sensor.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  sensors: Sensors[];

  constructor(private sensorService: SensorService) { }

  ngOnInit() {
    this.getSensors();
  }

  getSensors(): void {
    this.sensorService.getSensors()
      .subscribe(sensors => this.sensors = sensors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.sensorService.addSensor({ name } as Sensors).subscribe(sensor => {
      this.sensors.push(sensor);
    });
  }

  delete(sensor: Sensors): void {
    this.sensors = this.sensors.filter(h => h !== sensor);
    this.sensorService.deleteSensor(sensor).subscribe();
  }
}
