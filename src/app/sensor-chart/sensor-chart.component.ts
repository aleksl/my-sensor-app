import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../assets/js/canvasjs.min.js';
import { Sensors } from '../Sensors.js';
import { SensorDustService } from '../sensor-dust.service';
import { SensorTempHumPressService } from '../sensor-temp-hum-press.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit {

  @Input()
  sensor: Sensors;

  numberGet: number = 50;

  constructor(private sensorDustService: SensorDustService, private sensorTempHumPressService: SensorTempHumPressService) { }

  private formatDateTime(date) {
    return date.getFullYear() + "-" + this.addZ(date.getMonth() + 1) + "-" + this.addZ(date.getDate()) + " " + this.addZ(date.getHours()) + ":" + this.addZ(date.getMinutes()) + ":" + this.addZ(date.getSeconds());
  }

  private addZ(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  private generateSensorDustChart(sensorDust) {
    var pm1List = [], pm25List = [], pm10List = [];

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

      pm1Obj["label"] = this.formatDateTime(createdAt) + " PM1 ug/m3";
      pm25Obj["label"] = this.formatDateTime(createdAt) + " PM2.5 ug/m3";
      pm10Obj["label"] = this.formatDateTime(createdAt) + " PM10 ug/m3";

      pm1List.push(pm1Obj);
      pm25List.push(pm25Obj);
      pm10List.push(pm10Obj);
    }
    let dpsLength = pm10List.length;
    let chart = new CanvasJS.Chart("chartContainerSensorDust", {
      exportEnabled: true,
      title: {
        text: "Air Dust"
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

  private generateSensorTempChart(temp1List, temp2List) {
    let dpsLength = temp1List.length;
    let chart = new CanvasJS.Chart("chartContainerSensorTemp", {
      exportEnabled: true,
      title: {
        text: "TEMP"
      },
      axisX: {
        valueFormatString: "YYYY-MM-DD HH:mm:ss"
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "series1",
        legendText: "temp1 °C",
        dataPoints: temp1List,
      }, {
        type: "line",
        showInLegend: true,
        name: "series1",
        legendText: "temp2 °C",
        dataPoints: temp2List,
      }]
    });
    chart.render();
  }

  private generateSensorHumChart(humidityList) {

    let dpsLength = humidityList.length;
    let chart = new CanvasJS.Chart("chartContainerSensorHum", {
      exportEnabled: true,
      title: {
        text: "HUMIDITY"
      },
      axisX: {
        valueFormatString: "YYYY-MM-DD HH:mm:ss"
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "series2",
        legendText: "humidity %",
        dataPoints: humidityList,
      }]
    });
    chart.render();
  }
  private generateSensorTempHumPressChart(pressureList) {

    let dpsLength = pressureList.length;
    let chart = new CanvasJS.Chart("chartContainerSensorPress", {
      exportEnabled: true,
      title: {
        text: "PRESSURE"
      },
      axisX: {
        valueFormatString: "YYYY-MM-DD HH:mm:ss"
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "series2",
        legendText: "pressure hPa",
        dataPoints: pressureList,
      }]
    });
    chart.render();
  }

  private prepareDataSensorTempHumPressChart(sensorTempHumPress) {
    var temp1List = [], temp2List = [], humidityList = [], pressureList = [];

    for (var i in sensorTempHumPress) {
      var temp1Obj = {};
      var temp2Obj = {};
      var humidityObj = {};
      var pressureObj = {};
      var createdAt = new Date(sensorTempHumPress[i]["createdAt"]);
      temp1Obj["x"] = createdAt;
      temp2Obj["x"] = createdAt;
      humidityObj["x"] = createdAt;
      pressureObj["x"] = createdAt;

      temp1Obj["y"] = sensorTempHumPress[i]["temp1"];
      temp2Obj["y"] = sensorTempHumPress[i]["temp2"];
      humidityObj["y"] = sensorTempHumPress[i]["humidity"];
      pressureObj["y"] = sensorTempHumPress[i]["pressure"];

      temp1Obj["label"] = this.formatDateTime(createdAt) + " °C";
      temp2Obj["label"] = this.formatDateTime(createdAt) + " °C";
      humidityObj["label"] = this.formatDateTime(createdAt) + " %";
      pressureObj["label"] = this.formatDateTime(createdAt) + " hPa";

      temp1List.push(temp1Obj);
      temp2List.push(temp2Obj);
      humidityList.push(humidityObj);
      pressureList.push(pressureObj);
    }

    return { "temp1": temp1List, "temp2": temp2List, "humidity": humidityList, "pressure": pressureList };

  }
  ngOnInit() {
  }

  private initSensorDustChart(sensor) {
    var sensorDust;
    this.sensorDustService.getSensorDustBySensorIdCount(sensor.id, this.numberGet).pipe().subscribe(
      sensorDust => this.generateSensorDustChart(sensorDust)
    );
    const seconds = interval(20000);
    seconds.pipe().subscribe(
      value => this.sensorDustService.getSensorDustBySensorIdCount(sensor.id, this.numberGet).pipe().subscribe(
        sensorDust => this.generateSensorDustChart(sensorDust)
      ),
      err => console.log(err),
    );
  }

  private initSensorTempHumPressChart(sensor) {
    var sensorTempHumPress;
    this.sensorTempHumPressService.getSensorTempHumPressBySensorIdCount(sensor.id, this.numberGet).pipe().subscribe(
      sensorTempHumPress => {
        var chartsData = this.prepareDataSensorTempHumPressChart(sensorTempHumPress);
        this.generateSensorTempChart(chartsData["temp1"], chartsData["temp2"]);
        this.generateSensorHumChart(chartsData["humidity"]);
        this.generateSensorTempHumPressChart(chartsData["pressure"]);
      }
    );
    const seconds = interval(20000);
    seconds.pipe().subscribe(
      value => this.sensorTempHumPressService.getSensorTempHumPressBySensorIdCount(sensor.id, this.numberGet).pipe().subscribe(
        sensorTempHumPress => {
          var chartsData = this.prepareDataSensorTempHumPressChart(sensorTempHumPress);
          this.generateSensorTempChart(chartsData["temp1"], chartsData["temp2"]);
          this.generateSensorHumChart(chartsData["humidity"]);
          this.generateSensorTempHumPressChart(chartsData["pressure"]);
        }
      ),
      err => console.log(err),
    );
  }

  public ngAfterViewInit() {
    var sensor = this.sensor;
    this.initSensorDustChart(sensor);
    this.initSensorTempHumPressChart(sensor);
  }
}
