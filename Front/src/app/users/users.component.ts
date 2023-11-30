import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';
import { User } from '../model/user';
import { MessageService, SortEvent } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  selectedData: User;

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService) { }

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
