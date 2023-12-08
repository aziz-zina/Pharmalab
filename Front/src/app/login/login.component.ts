import { UserServiceService } from './../services/user-service.service';
import { NavbarService } from './../services/navbar.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserServiceService,
    private messageService: MessageService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  disable: boolean = false;

  showError(msg: string) {
    this.messageService.add({
      key: 'msg',
      severity: 'error',
      summary: 'Error',
      detail: msg,
    });
  }

  showWarn(msg: string) {
    this.messageService.add({
      key: 'msg',
      severity: 'warn',
      summary: 'Warning',
      detail: msg,
    });
  }

  register() {
    // Navigate to the register page
    this.router.navigate(['/Register']); // Replace '/register' with the actual route path
  }

  home() {
    this.router.navigate(['../']);
  }

  login(f: NgForm) {
    let email = f.value['email'];
    email = email.toLowerCase();
    let psw = f.value['password'];
    if (email == '' || psw == '') {
      this.showWarn('You have to fill the form first.');
    } else {
      this.disable = true;
      let user = new User(email, '', '', '', psw);
      this.userService.Login(user).subscribe(
        (data) => {
          this.router.navigate(['./']);
        },
        (error) => {
          console.log(error);
          this.disable = false;
          this.showError(error.error.message);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }
}
