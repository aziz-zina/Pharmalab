import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MedicineServiceService } from '../services/medicine-service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';
import { MedicineDetailsComponent } from '../medicine-details/medicine-details.component';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-list-meds-admin',
  templateUrl: './list-meds-admin.component.html',
  styleUrls: ['./list-meds-admin.component.css'],
  providers: [DialogService],
})
export class ListMedsAdminComponent {
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
  originalData: Medicine;
  editMode: boolean = false;
  checkIntention: boolean = false;
  lab_name: string;
  edit: boolean = true;
  display: boolean = true;

  listAllMedicines() {
    this.medicineService.getAllMedicines().subscribe((data) => {
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

  getSeverity(medStatus: string): string {
    if (medStatus === 'Non valid') {
      return 'danger';
    } else {
      return 'success';
    }
  }

  show(selectedData: Medicine) {
    this.originalData = new Medicine(
      selectedData.name,
      selectedData.description,
      selectedData.chemical_composition,
      selectedData.side_effects,
      selectedData.dosage_form,
      selectedData.manufacture_date,
      selectedData.expiry_date,
      selectedData.price,
      selectedData.quantity,
      selectedData.producer
    );
    this.originalData.setId(selectedData._id);
    //this.originalData.setState(selectedData.state);
    const ref = this.dialogService.open(MedicineDetailsComponent, {
      header: selectedData.name,
      width: '60%',
      contentStyle: { 'max-height': '550px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        edit: this.edit,
        selectedData: selectedData,
        editMode: this.editMode,
        originalData: this.originalData,
        checkIntention: this.checkIntention,
      },
    });

    ref.onClose.subscribe((user: User) => {
      if (!this.checkIntention) {
        this.listAllMedicines();
      }
    });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        if (
          data.role == 'pharmacy' ||
          data.role == 'laboratory' ||
          data.state == 'Non valid'
        ) {
          this.router.navigate(['./']);
          this.showWarn("You don't have access to this page", 'msg3');
        } else if (data.role == 'admin') {
          this.listAllMedicines();
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
