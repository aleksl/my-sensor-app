import { Injectable } from '@angular/core';
import { Sensors } from './Sensors';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { SensorUtilsService } from './sensor-utils.service';
import { SensorDust } from './SensorDust';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SensorDustService extends SensorUtilsService {

  private sensorsDustUrl = environment.baseUrl + '/sensorDust';

  constructor(private http: HttpClient, public messageService: MessageService) {
    super(messageService);
  }

  addSensorDustByGet(id: number): Observable<Sensors> {
    var pm1 = Math.floor((Math.random() * 300) + 1);
    var pm25 = Math.floor((Math.random() * 300) + 1);
    var pm10 = Math.floor((Math.random() * 300) + 1);
    const url = this.sensorsDustUrl + "/add?sensorId=" + `${id}` + "&pm1=" + pm1 + "&pm25=" + pm25 + "&pm10=" + pm10 + "&apiKey=111122223333";
    return this.http.get<Sensors>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensor id=${id}`)),
      catchError(this.handleError<Sensors>(`getSensor id=${id}`))
    );
  }

  getSensorDustBySensorId(sensorId: number): Observable<SensorDust[]> {
    const url = `${this.sensorsDustUrl}/list/${sensorId}`;
    return this.http.get<SensorDust[]>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensorDust by sensor id=${sensorId}`)),
      catchError(this.handleError<SensorDust[]>(`getSensorDustBySensorId id=${sensorId}`))
    );
  }

  getSensorDustBySensorIdCount(sensorId: number, count: number): Observable<SensorDust[]> {
    const url = `${this.sensorsDustUrl}/last/${sensorId}/${count}`;
    return this.http.get<SensorDust[]>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensorDust by sensor id=${sensorId}`)),
      catchError(this.handleError<SensorDust[]>(`getSensorDustBySensorId id=${sensorId}`))
    );
  }
}
