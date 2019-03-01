import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorSearchComponent } from './sensor-search.component';

describe('SensorSearchComponent', () => {
  let component: SensorSearchComponent;
  let fixture: ComponentFixture<SensorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
