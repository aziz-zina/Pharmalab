import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserServiceService } from './../services/user-service.service';
import { Component, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-users-profil',
  templateUrl: './users-profil.component.html',
  styleUrls: ['./users-profil.component.css']
})
export class UsersProfilComponent {
  selectedData: User;
  editMode: boolean;
  originalData: User;
  checkIntention: boolean;

  Roles: string[] = ["pharmacy", "laboratory"]

  selectedRole: string;

  constructor(private userService: UserServiceService, private route: Router, private config: DynamicDialogConfig, private ref: DynamicDialogRef, private messageService: MessageService) { }

  showDeleteSuccess(msg: string) {
    this.messageService.add({ key: 'msg5', severity: 'success', summary: 'Success', detail: msg });
  }

  showRoleWarn(msg: string) {
    this.messageService.add({ key: 'msg-selected-role', severity: 'warn', summary: 'Warning', detail: msg });
  }

  ngOnInit() {
    this.selectedData = this.config.data["selectedData"]
    this.editMode = this.config.data["editMode"]
    this.originalData = this.config.data["originalData"]
    this.checkIntention = this.config.data["checkIntention"]
  }


  onEditClick() {
    this.editMode = true;
  }

  onCancelClick() {
    this.editMode = false;
    this.selectedData = new User(this.originalData.email, this.originalData.address, this.originalData.name, this.originalData.role);
  }

  deleteUser() {
    // console.log(this.selectedData);
    // this.ref.close(this.selectedData);
    this.userService.deleteUser(this.selectedData).subscribe(
      (data) => {
        this.showDeleteSuccess("User deleted successfully.");
        this.checkIntention = true;
        this.ref.close(data);
      }
    )
  }

  updateUser() {
    if (this.selectedRole == undefined) {
      this.showRoleWarn("Please select a role first.");
    } else {
      this.selectedData = new User(this.selectedData.email, this.selectedData.address, this.selectedData.name, this.selectedRole);
      this.userService.updateUser(this.selectedData).subscribe(
        (data) => {
          this.showDeleteSuccess("User Updated successfully.");
          this.checkIntention = true;
          this.ref.close(data);
        }
      )
    }
  }

}

