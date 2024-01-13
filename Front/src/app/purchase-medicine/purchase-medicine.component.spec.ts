import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMedicineComponent } from './purchase-medicine.component';

describe('PurchaseMedicineComponent', () => {
  let component: PurchaseMedicineComponent;
  let fixture: ComponentFixture<PurchaseMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
