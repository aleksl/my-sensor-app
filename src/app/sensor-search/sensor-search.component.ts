import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, map, debounceTime, switchMap, catchError, } from 'rxjs/operators';
import { Sensors } from '../Sensors';
import { SensorService } from '../sensor.service';


@Component({
  selector: 'app-sensor-search',
  templateUrl: './sensor-search.component.html',
  styleUrls: ['./sensor-search.component.css']
})
export class SensorSearchComponent implements OnInit {
  public sensors$: Observable<Sensors> = null;
  public autoCompleteControl = new FormControl();

  constructor(private sensorService: SensorService, private router: Router ) {
  }

  lookup(value: string): Observable<Sensors> {
    return this.sensorService.searchSensors(value.toLowerCase()).pipe(
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this.sensors$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value)
        } else {
          return of(null)
        }
      })
    );
  }

  redirectToOtherSensor(id): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    let currentUrl = "/detail/" + id;
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.autoCompleteControl.setValue('');
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}