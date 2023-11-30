import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProfilComponent } from './users-profil.component';

describe('UsersProfilComponent', () => {
  let component: UsersProfilComponent;
  let fixture: ComponentFixture<UsersProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
