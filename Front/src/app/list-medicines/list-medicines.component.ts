import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Emitters } from '../emitters/emitters';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';
import { DialogService } from 'primeng/dynamicdialog';
import { MedicineDetailsComponent } from '../medicine-details/medicine-details.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styleUrls: ['./list-medicines.component.css'],
  providers: [DialogService],
})
export class ListMedicinesComponent {
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private medicineService: MedicineServiceService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  showWarn(msg: string, key: string) {
    this.messageService.add({
      key: key,
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
    });
  }

  medicines: Medicine[] = [];
  currentUser: User;
  originalData: Medicine;
  editMode: boolean = false;
  checkIntention: boolean = false;
  lab_name: string;
  edit: boolean = true;
  diaplay: boolean = true;

  listPersonalMedicines(user: User) {
    this.medicineService.getMedicines(user).subscribe((data) => {
      this.medicines = data;
    });
  }

  showDeleteSuccess(msg: string) {
    this.messageService.add({
      key: 'msg5',
      severity: 'success',
      summary: 'Success',
      detail: msg,
    });
  }

  show(selectedData: Medicine) {
    const ref = this.dialogService.open(MedicineDetailsComponent, {
      header: selectedData.name,
      width: '60%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        display: this.diaplay,
        edit: this.edit,
        selectedData: selectedData,
        editMode: this.editMode,
        originalData: this.originalData,
        checkIntention: this.checkIntention,
      },
    });

    ref.onClose.subscribe((user: User) => {
      if (!this.checkIntention) {
        this.listPersonalMedicines(this.currentUser);
      }
    });
  }

  quantity(medQuantity: number): boolean {
    return medQuantity == 0;
  }

  exDate(medExDate: Date): boolean {
    return new Date(medExDate) <= new Date();
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        if (data.role == 'pharmacy' || data.state == 'Non valid') {
          this.router.navigate(['./']);
          this.showWarn("You don't have access to this page", 'msg3');
        } else if (data.role == 'laboratory') {
          this.currentUser = new User(
            data.email,
            data.address,
            data.name,
            data.role
          );
          this.lab_name = data.name;
          this.listPersonalMedicines(data);
        }
      },
      (error) => {
        Emitters.authEmitter.emit(false);
        this.router.navigate(['./']);
        this.showWarn("You don't have access to this page", 'msg3');
      }
    );
  }
}
