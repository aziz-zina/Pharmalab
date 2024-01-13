import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { DockModule } from 'primeng/dock';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UsersProfilComponent } from './users-profil/users-profil.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { ListMedicinesComponent } from './list-medicines/list-medicines.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { LaboratoriesComponent } from './laboratories/laboratories.component';
import { ListMedsAdminComponent } from './list-meds-admin/list-meds-admin.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { PurchaseMedicineComponent } from './purchase-medicine/purchase-medicine.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterComponent,
    UsersComponent,
    UserProfilComponent,
    UsersProfilComponent,
    AddMedicineComponent,
    ListMedicinesComponent,
    MedicineDetailsComponent,
    MedicinesComponent,
    LaboratoriesComponent,
    ListMedsAdminComponent,
    PurchaseHistoryComponent,
    PurchaseMedicineComponent,
  ],
  imports: [
    TieredMenuModule,
    RadioButtonModule,
    HttpClientModule,
    TagModule,
    TabViewModule,
    BrowserAnimationsModule,
    TreeTableModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    MenuModule,
    MenubarModule,
    DockModule,
    PasswordModule,
    InputTextModule,
    DialogModule,
    DynamicDialogModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
    DividerModule,
    CardModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
