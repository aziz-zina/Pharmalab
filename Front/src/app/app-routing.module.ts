import { UserProfilComponent } from './user-profil/user-profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { ListMedicinesComponent } from './list-medicines/list-medicines.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { ListMedsAdminComponent } from './list-meds-admin/list-meds-admin.component';
import { PurchaseMedicineComponent } from './purchase-medicine/purchase-medicine.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'Profil', component: UserProfilComponent },
  { path: 'AddMedicine', component: AddMedicineComponent },
  { path: 'MedicinesList', component: ListMedicinesComponent },
  { path: 'Medicines', component: MedicinesComponent },
  { path: 'Laboratories', component: LaboratoriesComponent },
  { path: 'AllMedicines', component: ListMedsAdminComponent },
  { path: 'sex', component: PurchaseMedicineComponent },
  { path: 'sex2', component: PurchaseHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
