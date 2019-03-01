import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DustRangeComponent } from './dust-range.component';

describe('DustRangeComponent', () => {
  let component: DustRangeComponent;
  let fixture: ComponentFixture<DustRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DustRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DustRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
