import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmtreportComponent } from './amtreport.component';

describe('AmtreportComponent', () => {
  let component: AmtreportComponent;
  let fixture: ComponentFixture<AmtreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmtreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmtreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
