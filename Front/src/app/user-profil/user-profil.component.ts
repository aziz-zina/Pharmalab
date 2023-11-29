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
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent {

  showNavbar: boolean = true;
  authenticated: boolean = false;
  user: User;

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService)
  {}

  showError(msg: string) {
    this.messageService.add({ key: 'msg3', severity: 'error', summary: 'Error', detail: msg });
  }

  ngOnInit(): void {
    this.navbarService.display();
    Emitters.authEmitter.subscribe(
      (data: boolean) =>{
        console.log("Jawna behy");
        console.log(data);
      },
      (error) =>{
        console.log("Le");
        console.log(error);
      }
    )
    // Emitters.authEmitter.subscribe(
    //   (data: boolean) =>{
    //     this.authenticated = data;
    //     if(this.authenticated){

    //     }
    //   },
    //   (error) =>{
    //     console.log(error);
    //   }
    // )
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
      }
      , (error) => { console.log(error); })

  }
}
