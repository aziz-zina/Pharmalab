import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.display();
    this.userService.getUser().subscribe(
      (data) =>{
        Emitters.authEmitter.emit(true);
      },
      (error) =>{
        Emitters.authEmitter.emit(false);
      }
    )
  }
}
