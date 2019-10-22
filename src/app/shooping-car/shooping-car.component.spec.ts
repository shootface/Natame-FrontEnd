import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoopingCarComponent } from './shooping-car.component';

describe('ShoopingCarComponent', () => {
  let component: ShoopingCarComponent;
  let fixture: ComponentFixture<ShoopingCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoopingCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoopingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
