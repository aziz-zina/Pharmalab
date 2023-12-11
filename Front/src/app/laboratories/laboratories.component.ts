import { Component, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MessageService } from 'primeng/api';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css'],
})
export class LaboratoriesComponent {
  laboratories: User[] = [];

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private medicineService: MedicineServiceService
  ) {}

  listMedicines() {
    this.medicineService.getAllValidLaboratories().subscribe((data) => {
      this.laboratories = data;
    });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        this.listMedicines();
      },
      (error) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
