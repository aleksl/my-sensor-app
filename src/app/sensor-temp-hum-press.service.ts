import { Injectable } from '@angular/core';
import { Sensors } from './Sensors';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { SensorUtilsService } from './sensor-utils.service';
import { SensorTempHumPress } from './SensorTempHumPress';

@Injectable({
  providedIn: 'root'
})

export class SensorTempHumPressService extends SensorUtilsService {

  private sensorTempHumPressUrl = environment.baseUrl + '/sensorTempHumPress';

  constructor(private http: HttpClient, public messageService: MessageService) {
    super(messageService);
  }

  addSensorTempHumPressByGet(id: number): Observable<string> {
    var temp1 = Math.floor((Math.random() * 30) + 1);
    var temp2 = Math.floor((Math.random() * 30) + 1);
    var humidity = Math.floor((Math.random() * 100) + 1);
    var pressure = Math.floor((Math.random() * 1000) + 1);
    const url = this.sensorTempHumPressUrl + "/add?sensorId=" + `${id}` + "&temp1=" + temp1 + "&temp2=" + temp2 + "&humidity=" + humidity + "&pressure=" + pressure + "&apiKey=111122223333";
    return this.http.get<string>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`added SensorTempHumPress`)),
      catchError(this.handleError<string>(`add SensorTempHumPress error`))
    );
  }

  getSensorTempHumPressBySensorId(sensorId: number): Observable<SensorTempHumPress[]> {
    const url = `${this.sensorTempHumPressUrl}/list/${sensorId}`;
    return this.http.get<SensorTempHumPress[]>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensorTempHumPress by sensor id=${sensorId}`)),
      catchError(this.handleError<SensorTempHumPress[]>(`getSensorTempHumPressBySensorId id=${sensorId}`))
    );
  }

  getSensorTempHumPressBySensorIdCount(sensorId: number, count: number): Observable<SensorTempHumPress[]> {
    const url = `${this.sensorTempHumPressUrl}/last/${sensorId}/${count}`;
    return this.http.get<SensorTempHumPress[]>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensorTempHumPress by sensor id=${sensorId}`)),
      catchError(this.handleError<SensorTempHumPress[]>(`getSensorTempHumPressBySensorId id=${sensorId}`))
    );
  }
}
