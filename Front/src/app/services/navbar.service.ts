import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  showNavbar: BehaviorSubject<boolean>

  constructor() {
    this.showNavbar = new BehaviorSubject<boolean>(true);
  }

  hide(){
    this.showNavbar.next(false);
  }

  display(){
    this.showNavbar.next(true);
  }
}
