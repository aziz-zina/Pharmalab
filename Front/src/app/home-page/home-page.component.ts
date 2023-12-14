import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService
  ) {}

  showMessage(msg: string) {
    this.messageService.add({
      key: 'msg',
      severity: 'info',
      summary: 'Reminder',
      detail: msg,
      life: 20000,
    });
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        if (data.state == 'Non valid') {
          this.showMessage('Your account is not validated yet.');
        }
      },
      (error) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
