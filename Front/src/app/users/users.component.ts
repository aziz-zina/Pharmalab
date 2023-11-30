import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';
import { User } from '../model/user';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserProfilComponent } from '../user-profil/user-profil.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  selectedData: User;

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService, private dialogService: DialogService) { }

  showError(msg: string) {
    this.messageService.add({ key: 'msg3', severity: 'error', summary: 'Error', detail: msg });
  }

  showErrorLogin(msg: string) {
    this.messageService.add({ key: 'msg4', severity: 'error', summary: 'Error', detail: msg });
  }

  pharmacies: User[] = [];
  laboratories: User[] = [];

  getAllPharmacies() {
    this.userService.getAllPharmacies().subscribe(
      (data) => {
        this.pharmacies = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getAllLaboratories() {
    this.userService.getAllLaboratories().subscribe(
      (data) => {
        this.laboratories = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  showNavbar: boolean = true;
  authenticated: boolean = false;
  userName: string = "";
  visible: boolean = false;

  showDialog(data: any) {
    this.selectedData = data;
    this.visible = true;
  }

  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(UserProfilComponent, {
      header: this.selectedData.name + "'s profil",
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    // this.ref.onClose.subscribe((product: Product) => {
    //   if (product) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //   }
    // });

    // this.ref.onMaximize.subscribe((value) => {
    //   this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    // });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.userName = (data.name).toString();
        if (data.role == "pharmacy" || data.role == "laboratory") {
          this.router.navigate(['./']);
          this.showError("You don't have the permission to access this page.");
        } else {
          this.navbarService.display();
          this.getAllPharmacies();
          this.getAllLaboratories();
        }
      }
      , (error) => {
        console.log(error);
        this.router.navigate(['./Login']);
        this.showErrorLogin("You need to login first.");
      })
  }
}
