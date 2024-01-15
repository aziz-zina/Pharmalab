import { Component, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { MessageService } from 'primeng/api';
import { MedicineServiceService } from '../services/medicine-service.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css'],
})
export class LaboratoriesComponent {
  laboratories: User[] = [];

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private medicineService: MedicineServiceService
  ) {}

  listLaboratories() {
    this.medicineService.getAllValidLaboratories().subscribe((data) => {
      this.laboratories = data;
    });
  }

  searchTerm: string; // This will hold the search term

  filterTable() {
    // if (this.searchTerm == '') {
    //   this.listMedicines();
    // } else {
    //   this.medicines = this.medicines.filter((medicine) =>
    //     medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // }
    this.userService.filterLaboratoryByName(this.searchTerm).subscribe(
      (data) => {
        console.log(data.lab);
        this.laboratories = data.lab;
      },
      (error) => {
        console.log(error);
        console.log('jawou mouch behy');
      }
    );
  }

  ngOnInit(): void {
    this.navbarService.display();
    this.listLaboratories();
    this.userService.getUser().subscribe(
      (data) => {
        Emitters.authEmitter.emit(true);
      },
      (error) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
