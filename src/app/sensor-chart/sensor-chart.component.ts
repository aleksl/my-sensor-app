import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../assets/js/canvasjs.min.js';
import { Sensors } from '../Sensors.js';
import { SensorDustService } from '../sensor-dust.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit {

  @Input()
  sensor: Sensors;

  constructor(private sensorDustService: SensorDustService) { }

  private generateSensorDustChart(sensorDust) {
    var pm1List = [], pm25List = [], pm10List = [];

    function formatDateTime(date) {
      return date.getFullYear() + "-" + addZ(date.getMonth() + 1) + "-" + addZ(date.getDate()) + " " + addZ(date.getHours()) + ":" + addZ(date.getMinutes()) + ":" + addZ(date.getSeconds());
    }

    function addZ(n) {
      return n < 10 ? '0' + n : '' + n;
    }


    for (var i in sensorDust) {
      var pm1Obj = {};
      var pm25Obj = {};
      var pm10Obj = {};
      var createdAt = new Date(sensorDust[i]["createdAt"]);
      pm1Obj["x"] = createdAt;
      pm25Obj["x"] = createdAt;
      pm10Obj["x"] = createdAt;

      pm1Obj["y"] = sensorDust[i]["pm1"];
      pm25Obj["y"] = sensorDust[i]["pm25"];
      pm10Obj["y"] = sensorDust[i]["pm10"];

      pm1Obj["label"] = formatDateTime(createdAt) + " PM1 ug/m3";
      pm25Obj["label"] = formatDateTime(createdAt) + " PM2.5 ug/m3";
      pm10Obj["label"] = formatDateTime(createdAt) + " PM10 ug/m3";

      pm1List.push(pm1Obj);
      pm25List.push(pm25Obj);
      pm10List.push(pm10Obj);
    }
    let dpsLength = pm10List.length;
    let chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      title: {
        text: "Czujnik SMOGu"
      },
      axisX: {
        valueFormatString: "YYYY-MM-DD HH:mm:ss"
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "series1",
        legendText: "PM1 ug/m3",
        dataPoints: pm1List,
      }, {
        type: "line",
        showInLegend: true,
        name: "series2",
        legendText: "PM2.5 ug/m3",
        dataPoints: pm25List,
      }, {
        type: "line",
        showInLegend: true,
        name: "series2",
        legendText: "PM10 ug/m3",
        dataPoints: pm10List,
      }]
    });
    chart.render();
  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    var sensor = this.sensor;
    var sensorDust;
    this.sensorDustService.getSensorDustBySensorIdCount(sensor.id, 20).pipe().subscribe(
      sensorDust => this.generateSensorDustChart(sensorDust)
    );
    const seconds = interval(20000);
    seconds.pipe().subscribe(
      value => this.sensorDustService.getSensorDustBySensorIdCount(sensor.id, 20).pipe().subscribe(
        sensorDust => this.generateSensorDustChart(sensorDust)
      ),
      err => console.log(err),
    );
  }
}
