import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ArrayComponent } from './array/array.component';
import { ControlComponent } from './control/control.component';
import { FormComponent } from './form/form.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [AppComponent, ControlComponent, GroupComponent, FormComponent, ArrayComponent],
  imports: [BrowserAnimationsModule, HttpClientModule, BrowserModule, ReactiveFormsModule, ClipboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
