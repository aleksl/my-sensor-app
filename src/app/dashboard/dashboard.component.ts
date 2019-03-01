import { Component, OnInit } from '@angular/core';
import { Sensors } from '../Sensors';
import { SensorService } from '../sensor.service';
import { SensorDustService } from '../sensor-dust.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sensors: Sensors[] = [];
  sensorsLength : number = 0;
  constructor(private sensorService: SensorService, private sensorDustService: SensorDustService) { }

  ngOnInit() {
    this.getSensores();
    const seconds = interval(15000);
    seconds.pipe().subscribe(
      value => {
        //this.sensors = [];
        //this.getSensores();
      },
      err => console.log(err),
    );
  }

  getSensores(): void {
    this.sensorService.getSensors()
      .subscribe(sensors => {
        this.sensorsLength = sensors.length;
        sensors.forEach(sensor => {
          this.getCurrentSensorDust(sensor);
        });
      });
  }

  getCurrentSensorDust(sensor: Sensors): void {
    this.sensorDustService.getSensorDustBySensorIdCount(sensor.id, 1)
      .subscribe(sensorDustList => {
        if (sensorDustList != null && sensorDustList.length == 1) { sensor.sensorDust = sensorDustList[0] }
        this.sensors.push(sensor);
      });
  }
}