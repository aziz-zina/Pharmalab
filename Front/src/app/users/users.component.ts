import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { User } from '../model/user';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UsersProfilComponent } from '../users-profil/users-profil.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DialogService]
})
export class UsersComponent {

  //selectedData: User;
  editMode: boolean = false;

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService, public dialogService: DialogService) { }

  showError(msg: string) {
    this.messageService.add({ key: 'msg3', severity: 'error', summary: 'Error', detail: msg });
  }

  showErrorLogin(msg: string) {
    this.messageService.add({ key: 'msg4', severity: 'error', summary: 'Error', detail: msg });
  }

  showDeleteSuccess(msg: string) {
    this.messageService.add({ key: 'msg5', severity: 'success', summary: 'Success', detail: msg });
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

  // showDialog(data: any) {
  //   this.selectedData = data;
  //   this.visible = true;
  // }

  originalData: User;
  checkIntention: boolean = false;

  show(selectedData: User) {
    this.originalData = new User(selectedData.email, selectedData.address, selectedData.name, selectedData.role);
    const ref = this.dialogService.open(UsersProfilComponent, {
      header: selectedData.name,
      width: '50%',
      contentStyle: { "max-height": "550px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        selectedData: selectedData,
        editMode: this.editMode,
        originalData: this.originalData,
        checkIntention: this.checkIntention,
      },
    });

    ref.onClose.subscribe((user: User) => {
      if(!this.checkIntention){
        this.getAllPharmacies();
        this.getAllLaboratories();
        if(user){
          //console.log(this.deletedUser);

        }
      }
    })
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
