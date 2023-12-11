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
  original_id: string;
  date: String;

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

  showRoleWarn(msg: string) {
    this.messageService.add({
      key: 'msg-data',
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
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

  ngOnInit(): void {
    this.selectedData = this.config.data['selectedData'];
    this.original_id = this.selectedData._id;
    //console.log(this.original_id);
    this.editMode = this.config.data['editMode'];
    this.originalData = this.config.data['originalData'];
    //console.log(this.originalData);
    this.checkIntention = this.config.data['checkIntention'];
  }

  onEditClick() {
    this.editMode = true;
    //console.log(this.selectedData);
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

  deleteMedicine() {
    this.disabled_state = true;
    this.medicineService.deleteMedicine(this.selectedData).subscribe((data) => {
      this.showDeleteSuccess('User deleted successfully.');
      this.checkIntention = true;
      this.ref.close(data);
    });
  }

  updateMedicine() {
    console.log(this.selectedData.price);
    console.log(this.selectedData.quantity);
    //console.log(this.selectedData);
    if (
      this.selectedRole == undefined ||
      this.selectedData.name == '' ||
      this.selectedData.description == '' ||
      this.selectedData.chemical_composition == '' ||
      this.selectedData.side_effects == '' ||
      this.selectedData.dosage_form == '' ||
      this.selectedData.price <= 0 ||
      this.selectedData.quantity <= 0
    ) {
      this.showRoleWarn("Don't leave empty fields.");
    } else {
      this.disabled_state = true;
      this.selectedData = new Medicine(
        this.selectedData.name,
        this.selectedData.description,
        this.selectedData.chemical_composition,
        this.selectedData.side_effects,
        this.selectedData.dosage_form,
        this.selectedData.manufacture_date,
        this.selectedData.expiry_date,
        this.selectedData.price,
        this.selectedData.quantity,
        this.selectedData.producer,
        this.selectedData.state
      );
      this.selectedData.setId(this.original_id);
      console.log(this.selectedData);
      this.medicineService.updateMedicine(this.selectedData).subscribe(
        (data) => {
          this.showDeleteSuccess('User Updated successfully.');
          this.checkIntention = true;
          this.ref.close(data);
        },
        (error) => {
          this.disabled_state = false;
          this.showRoleWarn('Something went wrong.');
        }
      );
    }
  }
}
