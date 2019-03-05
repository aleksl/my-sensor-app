import { Sensors } from '../Sensors';
import { SensorDust } from '../SensorDust';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SensorService } from '../sensor.service';
import { SensorDustService } from '../sensor-dust.service';
import { SensorTempHumPressService } from '../sensor-temp-hum-press.service';
import { interval } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})

export class SensorDetailComponent implements OnInit {

  backgroudColor: string = 'rgba(66, 66, 66, 1)';
  sensor: Sensors;

  constructor(
    private route: ActivatedRoute,
    private sensorService: SensorService,
    private sensorDustService: SensorDustService,
    private sensorTempHumPressService: SensorTempHumPressService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSensor();
    //temp for fill data
    this.addNewMeasurmentOfSensorDust();
    this.addNewMeasurmentOfSensorTempHumPress();
    const seconds = interval(15000);
    seconds.pipe().subscribe(
      value => {
        //temp for fill data
        this.addNewMeasurmentOfSensorDust();
        this.addNewMeasurmentOfSensorTempHumPress();
        //end
        this.getCurrentSensorDust(this.sensor);
        this.getCurrentSensorTempHumPress(this.sensor);
      },
      err => console.log(err),
    );
  }

  addNewMeasurmentOfSensorDust() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sensorDustService.addSensorDustByGet(id)
      .subscribe();
  }

  addNewMeasurmentOfSensorTempHumPress() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sensorTempHumPressService.addSensorTempHumPressByGet(id)
      .subscribe();
  }

  getCurrentSensorDust(sensor: Sensors): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sensorDustService.getSensorDustBySensorIdCount(id, 1)
      .subscribe(sensorDustList => {
        if (sensorDustList != null && sensorDustList.length == 1) {
          sensor.sensorDust = sensorDustList[0];
          var smogColors = this.sensorDustService.getColorForSensorDust(this.sensor.sensorDust)
        }
        this.backgroudColor = smogColors["color"]
      });
  }

  getCurrentSensorTempHumPress(sensor: Sensors): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sensorTempHumPressService.getSensorTempHumPressBySensorIdCount(id, 1)
      .subscribe(sensorTempHumPressList => {
        if (sensorTempHumPressList != null && sensorTempHumPressList.length == 1) {
          sensor.sensorTempHumPress = sensorTempHumPressList[0];
        }
      });
  }

  getSensor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sensorService.getSensor(id)
      .subscribe(sensor => {
        this.sensor = sensor;
        this.getCurrentSensorDust(this.sensor);
        this.getCurrentSensorTempHumPress(this.sensor);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.sensorService.updateSensor(this.sensor)
      .subscribe(() => this.goBack());
  }
}


