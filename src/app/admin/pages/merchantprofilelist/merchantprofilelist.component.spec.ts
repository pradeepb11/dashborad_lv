import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantprofilelistComponent } from './merchantprofilelist.component';

describe('MerchantprofilelistComponent', () => {
  let component: MerchantprofilelistComponent;
  let fixture: ComponentFixture<MerchantprofilelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantprofilelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantprofilelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
