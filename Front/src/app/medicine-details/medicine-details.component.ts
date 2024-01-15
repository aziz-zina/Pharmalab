import { Component } from '@angular/core';
import { Medicine } from '../model/medicine';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  ConfirmEventType,
  ConfirmationService,
  Message,
  MessageService,
} from 'primeng/api';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css'],
  providers: [ConfirmationService, MessageService],
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
  admin: boolean = false;
  producer: User;
  edit: boolean;
  display: boolean;
  role: string;
  displayPharmacy: boolean = false;

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
    private confirmationService: ConfirmationService,
    private medicineService: MedicineServiceService,
    private route: Router,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    private userService: UserServiceService
  ) {}

  showRoleWarn(msg: string) {
    this.messageService.add({
      key: 'msg-data',
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
    });
  }

  showDeleteSuccess(msg: string, key: string) {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: 'Success',
      detail: msg,
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this medicine?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.deleteMedicine();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.role = data.role;
      if (data.role == 'admin') {
        this.admin = true;
      } else if (data.role == 'pharmacy') {
        this.displayPharmacy = true;
      }
      console.log(this.display);
    });
    this.selectedData = this.config.data['selectedData'];
    this.original_id = this.selectedData._id;
    this.edit = this.config.data['edit'];
    this.display = this.config.data['display'];
    console.log(this.edit);
    console.log(this.display);
    //console.log(this.original_id);
    this.editMode = this.config.data['editMode'];
    this.originalData = this.config.data['originalData'];
    //console.log(this.originalData);
    this.checkIntention = this.config.data['checkIntention'];
    this.userService
      .getUserById(this.selectedData.producer)
      .subscribe((data) => {
        this.producer = new User(
          data.producer.email,
          data.producer.address,
          data.producer.name,
          data.producer.role
        );
      });
    this.getBuyers();
  }

  buyers: any[] = [];
  getBuyers() {
    let array: any[] = [];
    if (this.selectedData.buyers) {
      array = this.selectedData.buyers;
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]._id);
        this.userService.getUserByBuyerId(array[i].buyer).subscribe((data) => {
          const obj = {
            buyer: data.buyer,
            medicine: this.selectedData,
            quantity: array[i].quantity,
            totalPrice: array[i].quantity * this.selectedData.price,
            date: array[i].dateOfPurchase,
          };
          //console.log(obj.totalPrice);
          console.log(obj);
          this.buyers.push(obj);
        });
      }
    }
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
      this.showDeleteSuccess('Medicine deleted successfully.', 'msg2');
      this.checkIntention = true;
      this.ref.close(data);
    });
  }

  validateMedicine() {
    this.disabled_state = true;
    console.log(this.originalData);
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
    this.selectedData.setState('Valid');
    this.selectedData.setId(this.original_id);
    console.log(this.selectedData);

    this.medicineService.updateMedicine(this.selectedData).subscribe((data) => {
      this.showDeleteSuccess(this.selectedData.name + ' is now Valid.', 'msg2');
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
          this.showDeleteSuccess('Medicine Updated successfully.', 'msg2');
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

  purchase: boolean = false;
  messages: Message[];
  openPurchaseOption() {
    this.purchase = true;
    console.log(this.getMessage());
  }

  medicineState: boolean = true;
  getMessage(): string {
    let msg = '';
    console.log(this.compareDates(this.selectedData.expiry_date, new Date()));
    if (
      this.compareDates(this.selectedData.expiry_date, new Date()) == 'Expired'
    ) {
      msg = 'Expired';
      this.medicineState = false;
    } else {
      if (
        this.compareDates(this.selectedData.expiry_date, new Date()) ==
        'Expiring soon'
      ) {
        msg = 'Expiring soon';
      }
    }
    if (this.selectedData.quantity == 0) {
      this.medicineState = false;
    }
    return msg;
  }

  value: number;
  purchaseMedicine() {
    if (this.value == undefined || this.value <= 0) {
      this.showRoleWarn('Please enter a valid quantity.');
      return;
    } else {
      if (this.value > this.selectedData.quantity) {
        this.showRoleWarn('Not enough medicine in stock.');
      } else {
        const body = {
          medicine: this.selectedData,
          quantity: this.value,
        };
        console.log(body);
        this.medicineService.buyMedicine(body).subscribe(
          (data) => {
            this.showDeleteSuccess('Medicine purchased.', 'msg2');
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

  compareDates(date1: Date, date2: Date): string {
    let statement = '';
    let date1Obj = new Date(date1);
    console.log(date1Obj);
    let date2Obj = new Date(date2);
    console.log(date2Obj);
    let differenceInTime = date1Obj.getTime() - date2Obj.getTime();
    console.log(differenceInTime);
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    console.log(differenceInDays);
    if (differenceInDays <= 0) {
      statement = 'Expired';
    } else if (differenceInDays < 30) {
      statement = 'Expiring soon';
    } else {
      statement = 'Valid';
    }
    console.log(statement);
    return statement;
  }
}
