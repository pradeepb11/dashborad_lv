import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountreportComponent } from './amountreport.component';

describe('AmountreportComponent', () => {
  let component: AmountreportComponent;
  let fixture: ComponentFixture<AmountreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
