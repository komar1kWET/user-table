import { NgModule } from "@angular/core";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersTableComponent } from './components/users-table/users-table.component';
import {HttpClientModule} from "@angular/common/http";
import { YearsOldPipe } from './pipes/years-old.pipe';
import { AddUserWindowComponent } from './components/add-user-window/add-user-window.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    YearsOldPipe,
    AddUserWindowComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  entryComponents: [AddUserWindowComponent],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, title: "FD2" } }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
