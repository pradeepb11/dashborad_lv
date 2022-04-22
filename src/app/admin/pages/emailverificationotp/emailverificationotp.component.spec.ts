import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverificationotpComponent } from './emailverificationotp.component';

describe('EmailverificationotpComponent', () => {
  let component: EmailverificationotpComponent;
  let fixture: ComponentFixture<EmailverificationotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailverificationotpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailverificationotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
