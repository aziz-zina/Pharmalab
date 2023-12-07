import { UserServiceService } from './../services/user-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{

  showNavbar: boolean = true;
  subscription: Subscription;
  authenticated: boolean = false;
  userName :string = "";

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) =>{
        this.showNavbar = value;
    });
  }

  showMessage(msg: string) {
    this.messageService.add({ key: 'msg2', severity: 'info', summary: 'Reminder', detail: msg, life: 20000 });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  items: MenuItem[] = [];
  userItems: MenuItem[] = [];
  activeItem: MenuItem ;

  login(){
    this.router.navigate(['./Login']);
  }

  logout(){
    this.userService.logout().subscribe(
      (data) =>{
        this.authenticated = false;
        this.router.navigate(['./']);
      })
  }


  ngOnInit() {
    Emitters.authEmitter.subscribe(
      (data: boolean) =>{
        this.authenticated = data;
        if(this.authenticated){
          this.userService.getUser().subscribe(
            (data) =>{
              this.userName = (data.name).toString();
              if(data.state == "Non valid"){
                this.showMessage("Your account is not validated yet.");
              }
              if(data.role == "pharmacy"){
                this.userItems = [
                  { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: './' },
                  {
                    label: 'Purchase history', icon: 'pi pi-fw pi-history',
                  },
                  { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); }}
                ];
              } else if(data.role == "admin"){
                this.userItems = [
                  { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: './Profil' },
                  {
                    label: 'Users', icon: 'pi pi-fw pi-users', routerLink: './Users'
                  },
                  { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); }}
                ];
              } else if(data.role == "laboratory"){
                this.userItems = [
                  { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: './Profil' },
                  {
                    label: 'Medicines', icon: 'pi pi-fw pi-shield', routerLink: './'
                  },
                  {
                    label: 'Add Medicines', icon: 'pi pi-fw pi-plus', routerLink: './AddMedicine'
                  },
                  { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); }}
                ];
              }
            }
            , (error) =>{console.log(error);})
        }
      },
      (error) =>{
        console.log(error);
      }
    )

    this.items = [
      { label: 'Home Page', icon: 'pi pi-fw pi-home', routerLink: './' },
      {
        label: 'Frais', icon: 'pi pi-fw pi-folder', items: [
          { label: 'Consulter Frais', routerLink: './consulterFrais' },
          { label: 'Les Fais en attente', routerLink: './listFrais' }
        ]
      },
      { label: '', icon: '', routerLink: './', disabled: true }
    ];

    this.activeItem = this.items[3];
  }

}
