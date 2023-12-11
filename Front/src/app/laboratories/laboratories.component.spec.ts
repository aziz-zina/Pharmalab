import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriesComponent } from './laboratories.component';

describe('LaboratoriesComponent', () => {
  let component: LaboratoriesComponent;
  let fixture: ComponentFixture<LaboratoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
