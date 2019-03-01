import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SensorSearchComponent } from './sensor-search/sensor-search.component';
import { HereMapComponent } from './here-map/here-map.component';
import { SensorChartComponent } from './sensor-chart/sensor-chart.component';
import { DustRangeComponent } from './dust-range/dust-range.component';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatGridListModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SensorsComponent,
    SensorDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SensorSearchComponent,
    HereMapComponent,
    SensorChartComponent,
    DustRangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule, MatSlideToggleModule,
    MatExpansionModule,
    MatAutocompleteModule, ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
