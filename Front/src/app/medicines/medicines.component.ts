import { UserServiceService } from './../services/user-service.service';
import { Component } from '@angular/core';
import { Medicine } from '../model/medicine';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MessageService } from 'primeng/api';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
})
export class MedicinesComponent {
  medicines: Medicine[] = [];

  constructor(
    private medicineService: MedicineServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private userService: UserServiceService
  ) {}

  listMedicines() {
    this.medicineService.getAllValidMedicines().subscribe((data) => {
      this.medicines = data;
    });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.listMedicines();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
      },
      (error) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
