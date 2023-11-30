import { UserServiceService } from './../services/user-service.service';
import { NavbarService } from './../services/navbar.service';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  EMAIL: string = "";
  isSmallVisible: boolean = false;

  constructor(private userService: UserServiceService, private messageService: MessageService, private router: Router, private navbarService: NavbarService, private elementRef: ElementRef, private renderer: Renderer2) { }

  showError(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'error', summary: 'Error', detail: msg });
  }

  showWarn(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'warn', summary: 'Warning', detail: msg });
  }

  register() {
    // Navigate to the register page
    this.router.navigate(['/Register']); // Replace '/register' with the actual route path
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  home() {
    this.router.navigate(['../']);
  }

  validateEmail() {
    const inputElement = this.elementRef.nativeElement.querySelector('input[name=email]');
    const smallElement = this.elementRef.nativeElement.querySelector('#username-help');
    let test = this.isValidEmail(this.EMAIL);
    if (!test) {
      inputElement.classList.add('ng-invalid');
      inputElement.classList.add('ng-dirty');
      this.isSmallVisible = true;
    } else {
      inputElement.classList.remove('ng-invalid');
      inputElement.classList.remove('ng-dirty');
      this.isSmallVisible = false;
    }
    return test;
  }

  login(f: NgForm) {
    let email = f.value["email"];
    email = email.toLowerCase();
    let psw = f.value["password"];
    if (email == "" || psw == "") {
      this.showWarn("You have to fill the form first.");
    } else {
      if (this.isValidEmail(email)) {
        let user = new User(email, "", "", "", psw);
        this.userService.Login(user).subscribe(
          (data) => {
            //console.log(data);
            // Check if the login was successful
            this.router.navigate(['./']);
          },
          (error) => {
            console.log(error);
            this.showError("Incorrect email and/or password.");
          }
        );
      } else {
        this.showWarn("Provide a valid email address.");
      }
    }
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }
}
