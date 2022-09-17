import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ControlComponent} from "./control/control.component";
import {GroupComponent} from "./group/group.component";
import {FormComponent} from './form/form.component';
import {HttpClientModule} from "@angular/common/http";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ArrayComponent} from "./array/array.component";


@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    GroupComponent,
    FormComponent,
    ArrayComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
