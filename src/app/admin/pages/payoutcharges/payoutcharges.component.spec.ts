import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutchargesComponent } from './payoutcharges.component';

describe('PayoutchargesComponent', () => {
  let component: PayoutchargesComponent;
  let fixture: ComponentFixture<PayoutchargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutchargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutchargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
