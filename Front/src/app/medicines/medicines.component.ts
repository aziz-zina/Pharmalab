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
  medicines: any[] = [];
  editMode: boolean = false;
  edit: boolean = false;
  display: boolean = false;
  inventoryStatus: string;

  constructor(
    private medicineService: MedicineServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private userService: UserServiceService,
    private dialogService: DialogService
  ) {}

  searchTerm: string; // This will hold the search term

  filterTable() {
    // if (this.searchTerm == '') {
    //   this.listMedicines();
    // } else {
    //   this.medicines = this.medicines.filter((medicine) =>
    //     medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // }
    this.medicineService.filterMedicineByName(this.searchTerm).subscribe(
      (data) => {
        //console.log(data.medicines);
        this.medicines = data.medicines;
      },
      (error) => {
        console.log(error);
        console.log('jawou mouch behy');
      }
    );
  }

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
