import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserServiceService } from './../services/user-service.service';
import { Component, Input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-users-profil',
  templateUrl: './users-profil.component.html',
  styleUrls: ['./users-profil.component.css']
})
export class UsersProfilComponent {
  @Input() selectedData: User;
  editMode: boolean = false;
  originalData: User;

  constructor(private userService: UserServiceService, private route: Router) {}

  ngOnInit() {

  }


  onEditClick() {
    this.editMode = true;
    this.originalData = new User(this.selectedData.email, this.selectedData.address, this.selectedData.name, this.selectedData.role);
  }

  onCloseClick() {
    this.editMode = false;
    console.log(this.selectedData);
    this.selectedData = this.originalData ;
  }

  deleteUser(){
    //this.dialogRef.close();
    this.route.navigate(['./Users']);
    // this.userService.deleteUser(this.selectedData).subscribe(
    //   (data) =>{
    //     console.log(data);
    //   }
    // )
  }

}
