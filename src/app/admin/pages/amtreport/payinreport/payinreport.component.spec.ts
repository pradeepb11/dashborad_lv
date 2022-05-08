import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinreportComponent } from './payinreport.component';

describe('PayinreportComponent', () => {
  let component: PayinreportComponent;
  let fixture: ComponentFixture<PayinreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayinreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayinreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
