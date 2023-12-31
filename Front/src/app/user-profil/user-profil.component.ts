import { Component } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css'],
})
export class UserProfilComponent {
  showNavbar: boolean = true;
  authenticated: boolean = false;
  user: User;
  editMode: boolean = false;
  originalData: User;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private navbarService: NavbarService,
    public messageService: MessageService
  ) {}

  showErrorAccess(msg: string) {
    this.messageService.add({
      key: 'msg3',
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

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
        console.log(data);
        if (data.state == 'Non valid') {
          this.router.navigate(['/']);
        }
        this.user = data;
        this.originalData = new User(
          this.user.email,
          this.user.address,
          this.user.name,
          this.user.role
        );
      },
      (error) => {
        this.showErrorAccess('You need to login first!');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
        console.log(error);
      }
    );
  }

  onEditClick() {
    this.editMode = true;
  }

  onCancelClick() {
    this.user = new User(
      this.originalData.email,
      this.originalData.address,
      this.originalData.name,
      this.originalData.role
    );
    this.editMode = false;
  }

  onUpdateClick() {
    this.userService.updateUser(this.user).subscribe((data) => {
      this.editMode = false;
      this.router.navigate(['/Profil']);
      this.showSuccess('Profil updated successfully.');
    });
  }
}
