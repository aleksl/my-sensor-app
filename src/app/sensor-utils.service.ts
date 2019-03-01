import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { SensorDust } from './SensorDust';

@Injectable({
  providedIn: 'root'
})
export class SensorUtilsService {

  constructor(public messageService: MessageService) { }

  public getColorForSensorDust(sensorDust: SensorDust): object {
    //blue rgb(10, 123, 255, 0.6);
    //green 134, 195, 81, 1
    //yellow 247, 237, 0, 1
    //orange 255, 184, 0, 1
    //red 255, 88, 23, 1
    //brown 145, 57, 0, 1
    var currnetColor = 'rgba(10, 123, 255, 0.6)';
    var colorN = "blue";
    if (sensorDust == null) {
      return { "color": currnetColor, "colorName": colorN };
    }
    var pm25 = sensorDust.pm25;
    var pm10 = sensorDust.pm10
    /*
    //0-1 bardzo dobry
    if (pm10 >= 0 && pm10 < 20) {
      currnetColor = 'rgba(10, 123, 255, 0.6)';
    }
    //1-3 dobry
    if (pm10 >= 20 && pm10 < 60) {
      currnetColor = 'rgba(134, 195, 81, 0.6)';
    }
    //3-5 umiarkowany
    if (pm10 >= 60 && pm10 < 100) {
      currnetColor = 'rgba(247, 237, 0, 0.6)';
    }
    //5-7 dostateczny
    if (pm10 >= 100 && pm10 < 140) {
      currnetColor = 'rgba(255, 184, 0, 0.6)';
    }
    //7-10 zly
    if (pm10 >= 140 && pm10 < 200) {
      currnetColor = 'rgba(255, 88, 23, 0.6)';
    }
    //>10 bardzo zly
    if (pm10 >= 200) {
      currnetColor = 'rgba(145, 57, 0, 0.6)';
    }
    */

    //0-1 bardzo dobry
    if (pm25 >= 0 && pm25 < 12) {
      currnetColor = 'rgba(10, 123, 255, 0.6)';
      colorN = "blue";
    }
    //1-3 dobry
    if (pm25 >= 12 && pm25 < 36) {
      currnetColor = 'rgba(134, 195, 81, 0.6)';
      colorN = "green";
    }
    //3-5 umiarkowany
    if (pm25 >= 36 && pm25 < 60) {
      currnetColor = 'rgba(247, 237, 0, 0.6)';
      colorN = "yellow";
    }
    //5-7 dostateczny
    if (pm25 >= 60 && pm25 < 84) {
      currnetColor = 'rgba(255, 184, 0, 0.6)';
      colorN = "orange";
    }
    //7-10 zly
    if (pm25 >= 84 && pm25 < 120) {
      currnetColor = 'rgba(255, 88, 23, 0.6)';
      colorN = "red";
    }
    //>10 bardzo zly
    if (pm25 >= 120) {
      currnetColor = 'rgba(145, 57, 0, 0.6)';
      colorN = "brown";
    }
    return { "color": currnetColor, "colorName": colorN };
  }


  public log(message: string) {
    this.messageService.add(`SensorService: ${message}`);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log('${operation} failed: ${error.message}');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
