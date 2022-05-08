import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutreportComponent } from './payoutreport.component';

describe('PayoutreportComponent', () => {
  let component: PayoutreportComponent;
  let fixture: ComponentFixture<PayoutreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
