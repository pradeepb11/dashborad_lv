import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NupayComponent } from './nupay.component';

describe('NupayComponent', () => {
  let component: NupayComponent;
  let fixture: ComponentFixture<NupayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NupayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NupayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
