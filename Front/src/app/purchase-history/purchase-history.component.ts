import { UserServiceService } from './../services/user-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
//import { Product } from '../../api/product';
//import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { MedicineServiceService } from '../services/medicine-service.service';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';
import { Medicine } from '../model/medicine';
import { DialogService } from 'primeng/dynamicdialog';
import { MedicineDetailsComponent } from '../medicine-details/medicine-details.component';
//import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
  providers: [DialogService],
})
export class PurchaseHistoryComponent implements OnInit {
  history: any[] = [];
  history2: any[] = [];
  editMode: boolean = false;
  edit: boolean = false;
  display: boolean = false;
  inventoryStatus: string;

  constructor(
    private userService: UserServiceService,
    private medicineService: MedicineServiceService,
    private navbarService: NavbarService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  showErrorAccess(msg: string) {
    this.messageService.add({
      key: 'msg3',
      severity: 'error',
      summary: 'Error',
      detail: msg,
    });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        console.log(data);
        if (data.state == 'Non valid') {
          this.router.navigate(['/']);
        } else {
          if (data.role == 'laboratory') {
            this.showErrorAccess('You are not allowed to access this page!');
            this.router.navigate(['/']);
          }
        }
      },
      (error) => {
        this.showErrorAccess('You need to login first!');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
        console.log(error);
      }
    );
    this.userService.getUser().subscribe((data) => {
      //console.log(data);
      this.history = data.medicines_bought;
      //console.log(this.history);
      this.initializeArray();
      //console.log(this.history2);
    });
  }

  initializeArray() {
    for (let i = 0; i < this.history.length; i++) {
      console.log(this.history[i].medicine);
      this.medicineService
        .getMedicineById(this.history[i].medicine)
        .subscribe((data) => {
          const obj = {
            medicine: data.medicine,
            quantity: this.history[i].quantity,
            totalPrice: this.history[i].quantity * data.medicine.price,
            date: this.history[i].dateOfPurchase,
          };
          console.log(obj.totalPrice);
          //console.log(obj);
          this.history2.push(obj);
        });
    }
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
}
