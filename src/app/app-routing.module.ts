import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorsComponent }      from './sensors/sensors.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SensorDetailComponent }  from './sensor-detail/sensor-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: SensorDetailComponent },
  { path: 'sensors', component: SensorsComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}