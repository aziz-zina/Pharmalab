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
    public dialogService: DialogService
  ) {}

  medicines: Medicine[] = [];
  currentUser: User;
  originalData: Medicine;
  editMode: boolean = false;
  checkIntention: boolean = false;

  listPersonalMedicines(user: User) {
    console.log(user._id);
    this.medicineService.getMedicines(user).subscribe((data) => {
      this.medicines = data;
      console.log(data);
    });
  }

  show(selectedData: Medicine) {
    const ref = this.dialogService.open(MedicineDetailsComponent, {
      header: selectedData.name,
      width: '50%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        selectedData: selectedData,
        editMode: this.editMode,
        originalData: this.originalData,
        checkIntention: this.checkIntention,
      },
    });

    // ref.onClose.subscribe((user: User) => {
    //   // if (!this.checkIntention) {
    //   //   this.getAllPharmacies();
    //   //   this.getAllLaboratories();
    //   //   if (user) {
    //   //     //console.log(this.deletedUser);
    //   //   }
    //   // }
    // });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        this.currentUser = data;
        this.listPersonalMedicines(data);
      },
      (error) => {
        Emitters.authEmitter.emit(false);
        this.router.navigate(['./']);
      }
    );
  }
}
