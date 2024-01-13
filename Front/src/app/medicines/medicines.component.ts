import { UserServiceService } from './../services/user-service.service';
import { Component } from '@angular/core';
import { Medicine } from '../model/medicine';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MessageService } from 'primeng/api';
import { Emitters } from '../emitters/emitters';
import { DialogService } from 'primeng/dynamicdialog';
import { MedicineDetailsComponent } from '../medicine-details/medicine-details.component';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
  providers: [DialogService],
})
export class MedicinesComponent {
  medicines: Medicine[] = [];
  editMode: boolean = false;
  edit: boolean = false;
  display: boolean = false;

  constructor(
    private medicineService: MedicineServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private userService: UserServiceService,
    private dialogService: DialogService
  ) {}

  listMedicines() {
    this.medicineService.getAllValidMedicines().subscribe((data) => {
      this.medicines = data;
    });
  }

  show(selectedData: Medicine) {
    const ref = this.dialogService.open(MedicineDetailsComponent, {
      header: selectedData.name,
      width: '60%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        display: this.display,
        selectedData: selectedData,
        editMode: this.editMode,
        edit: this.edit,
      },
    });

    ref.onClose.subscribe();
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
