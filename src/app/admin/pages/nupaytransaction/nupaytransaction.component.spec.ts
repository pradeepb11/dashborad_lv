import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NupaytransactionComponent } from './nupaytransaction.component';

describe('NupaytransactionComponent', () => {
  let component: NupaytransactionComponent;
  let fixture: ComponentFixture<NupaytransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NupaytransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NupaytransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
