import { UserProfilComponent } from './user-profil/user-profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'Profil', component: UserProfilComponent },
  { path: 'AddMedicine', component: AddMedicineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
