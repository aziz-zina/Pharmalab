import { Component } from '@angular/core';
import { Medicine } from '../model/medicine';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css'],
})
export class MedicineDetailsComponent {
  selectedData: Medicine;
  editMode: boolean;
  originalData: Medicine;
  checkIntention: boolean;
  disabled_state: boolean = false;
  minDate = new Date();

  Roles: string[] = [
    'Tablet',
    'Capsule',
    'Liquid',
    'Inhalation',
    'Powder',
    'Patches',
  ];

  selectedRole: string;

  constructor(
    private medicineService: MedicineServiceService,
    private route: Router,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.selectedData = this.config.data['selectedData'];
    this.editMode = this.config.data['editMode'];
    console.log(this.editMode);
    this.originalData = this.config.data['originalData'];
    this.checkIntention = this.config.data['checkIntention'];
  }

  onEditClick() {
    this.editMode = true;
  }

  onCancelClick() {
    //this.disabled_state = true;
    this.editMode = false;
    this.selectedData = new Medicine(
      this.originalData.name,
      this.originalData.description,
      this.originalData.chemical_composition,
      this.originalData.side_effects,
      this.originalData.dosage_form,
      this.originalData.manufacture_date,
      this.originalData.expiry_date,
      this.originalData.price,
      this.originalData.quantity,
      this.originalData.producer
    );
  }

  deleteUser() {
    // this.disabled_state = true;
    // this.medicineService.deleteUser(this.selectedData).subscribe((data) => {
    //   this.showDeleteSuccess('User deleted successfully.');
    //   this.checkIntention = true;
    //   this.ref.close(data);
    // });
  }
}
