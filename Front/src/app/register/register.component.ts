import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NavbarService } from '../services/navbar.service';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private userService: UserServiceService, private messageService: MessageService, private router: Router, private navbarService: NavbarService, private elementRef: ElementRef) { }

  selectedRole: string = 'pharmacy';

  showError(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'error', summary: 'Error', detail: msg });
  }

  showWarn(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'warn', summary: 'Warning', detail: msg });
  }

  register(f: NgForm) {
    let name = f.value["name"];
    let psw = f.value["password"];
    let email = f.value["email"];
    email = email.toLowerCase();
    let address = f.value["address"];
    let role = this.selectedRole;

    // console.log(this.isValidPassword(psw));
    // if (!this.isValidPassword(psw)) {
    //   this.showWarn("Please provide a valid password.");
    // } else {
    //   this.showWarn("Jawek bnin");
    // }

    if (name == "" || psw == "" || email == "" || address == "") {
      this.showWarn("You have to fill the form first");
    } else {
      this.userService.register(new User(email, address, name, role, psw)).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['./Login']);
        }, (error) => {
          console.log(error.error);
          this.showError(error.error.message);
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  onRoleChange() {
    console.log('Selected role changed:', this.selectedRole);
  }

}
