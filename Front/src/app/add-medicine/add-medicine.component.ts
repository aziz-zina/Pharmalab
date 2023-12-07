import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService) {}

  public selectedDosageForm: string;
  public dosageFormOptions: any[] = [
    { label: 'Tablet', value: 'tablet' },
    { label: 'Capsule', value: 'capsule' },
    { label: 'Capsule', value: 'capsule' },
    { label: 'Capsule', value: 'capsule' },
  ];

  minDate: Date= new Date();

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) =>{
        Emitters.authEmitter.emit(true);
      },
      (error) =>{
        Emitters.authEmitter.emit(false);
      }
    )
  }

}
