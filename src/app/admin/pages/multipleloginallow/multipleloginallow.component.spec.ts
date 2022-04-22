import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleloginallowComponent } from './multipleloginallow.component';

describe('MultipleloginallowComponent', () => {
  let component: MultipleloginallowComponent;
  let fixture: ComponentFixture<MultipleloginallowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleloginallowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleloginallowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
