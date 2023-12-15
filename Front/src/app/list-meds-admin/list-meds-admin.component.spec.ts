import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedsAdminComponent } from './list-meds-admin.component';

describe('ListMedsAdminComponent', () => {
  let component: ListMedsAdminComponent;
  let fixture: ComponentFixture<ListMedsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
