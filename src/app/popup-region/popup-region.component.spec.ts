import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegionComponent } from './popup-region.component';

describe('PopupRegionComponent', () => {
  let component: PopupRegionComponent;
  let fixture: ComponentFixture<PopupRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
