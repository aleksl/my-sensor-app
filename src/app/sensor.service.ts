import { Injectable } from '@angular/core';
import { Sensors } from './Sensors';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { SensorUtilsService } from './sensor-utils.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SensorService extends SensorUtilsService {

  private sensorsUrl = environment.baseUrl + '/sensors';

  constructor(private http: HttpClient, public messageService: MessageService) {
    super(messageService);
  }

  getSensors(): Observable<Sensors[]> {
    // TODO: send the message _after_ fetching the sensores
    return this.http.get<Sensors[]>(this.sensorsUrl + '/list').pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensores`)),
      catchError(this.handleError(`getSensores`, []))
    );
  }
  /** GET sensor by id. Will 404 if id not found */
  getSensor(id: number): Observable<Sensors> {
    const url = `${this.sensorsUrl}/${id}`;
    return this.http.get<Sensors>(url).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`fetched sensor id=${id}`)),
      catchError(this.handleError<Sensors>(`getSensor id=${id}`))
    );
  }

  updateSensor(sensor: Sensors): Observable<any> {
    return this.http.put(this.sensorsUrl, sensor, httpOptions).pipe(
      tap(_ => this.log(`update sensor id=${sensor.id}`)),
      catchError(this.handleError<any>('updateSensor'))
    );
  }

  addSensor(sensor: Sensors): Observable<Sensors> {
    return this.http.post<Sensors>(this.sensorsUrl, sensor, httpOptions).pipe(
      tap((newSensor: Sensors) => this.log(`added sensor w/ id =${newSensor.id}`)),
      catchError(this.handleError<Sensors>('addSensor'))
    );
  }

  deleteSensor(sensor: Sensors | number): Observable<Sensors> {
    const id = typeof sensor === 'number' ? sensor : sensor.id;
    const url = `${this.sensorsUrl}/${id}`;
    return this.http.delete<Sensors>(url, httpOptions).pipe(
      tap(_ => this.log(`delete sensor id = ${id} `)),
      catchError(this.handleError<Sensors>('deleteSensor'))
    );
  }

  searchSensors(term: string): Observable<Sensors[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Sensors[]>(`${this.sensorsUrl}/list/${term}`).pipe(map(response => {
      return response["result"];
    }),
      tap(_ => this.log(`found sensors matching "${term}"`)),
      catchError(this.handleError<Sensors[]>('searchSensores', []))
    );
  }
}
