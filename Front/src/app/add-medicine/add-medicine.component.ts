import { MedicineServiceService } from './../services/medicine-service.service';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';
import { NgForm } from '@angular/forms';
import { Medicine } from '../model/medicine';
import { User } from '../model/user';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent {
  constructor(
    private userService: UserServiceService,
    private medicineService: MedicineServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService
  ) {}

  public selectedDosageForm: string;
  dosageFormOptions: string[] = [
    'Tablet',
    'Capsule',
    'Liquid',
    'Inhalation',
    'Powder',
    'Patches',
  ];

  showWarn(msg: string, key: string) {
    this.messageService.add({
      key: key,
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
    });
  }

  showError(msg: string) {
    this.messageService.add({
      key: 'msg',
      severity: 'error',
      summary: 'Error',
      detail: msg,
    });
  }

  showSuccess(msg: string) {
    this.messageService.add({
      key: 'msg3',
      severity: 'success',
      summary: 'Success',
      detail: msg,
    });
  }

  minDate: Date = new Date();
  currentUser: User;
  disable: boolean = false;

  verifyMedicine(f: NgForm) {}

  addMedicine(f: NgForm) {
    let name = f.value['name'];
    let desc = f.value['desc'];
    let chem = f.value['chem'];
    let side = f.value['side'];
    let manDate = f.value['manDate'];
    let expDate = f.value['expDate'];
    let price = f.value['price'];
    let quantity = f.value['quantity'];
    if (
      name == '' ||
      desc == '' ||
      chem == '' ||
      side == '' ||
      price == 0 ||
      quantity == 0 ||
      this.selectedDosageForm == undefined
    ) {
      let m = new Medicine(
        name,
        desc,
        chem,
        side,
        this.selectedDosageForm,
        manDate,
        expDate,
        price,
        quantity,
        this.currentUser._id
      );
      console.log(m);
      this.showWarn('Please fill the form before.', 'msg');
    } else {
      this.disable = true;
      let m = new Medicine(
        name,
        desc,
        chem,
        side,
        this.selectedDosageForm,
        manDate,
        expDate,
        price,
        quantity,
        this.currentUser._id
      );
      this.medicineService.addMedicine(m).subscribe(
        (data) => {
          this.showSuccess('Medicine added successfully');
          this.router.navigate(['./MedicinesList']);
        },
        (error) => {
          this.disable = false;
          this.showError('Problem occurred while adding the medicine.');
        }
      );
    }
  }

  ngOnInit(): void {
    if (
      this.userService.getUser().subscribe(
        (data) => {
          if (data.role == 'pharmacy' || data.state == 'Non valid') {
            this.router.navigate(['./']);
            this.showWarn("You don't have access to this page", 'msg3');
          }
        },
        (error) => {
          this.router.navigate(['./']);
          this.showWarn("You don't have access to this page", 'msg3');
        }
      )
    )
      this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        this.currentUser = data;
        console.log(this.currentUser);
        Emitters.authEmitter.emit(true);
      },
      (error) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }

  check() {
    console.log(this.selectedDosageForm);
  }
}
