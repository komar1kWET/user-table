import { NgModule } from "@angular/core";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, AppRoutingModule],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, title: "FD2" } }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
