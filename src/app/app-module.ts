import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AllTemplateFront } from './FrontOffice/all-template-front/all-template-front';
import { HeaderFront } from './FrontOffice/header-front/header-front';
import { FooterFront } from './FrontOffice/footer-front/footer-front';
import { EventForm } from './FrontOffice/event-form/event-form';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Events } from './FrontOffice/events/events';

@NgModule({
  declarations: [
    App,
    AllTemplateFront,
    HeaderFront,
    FooterFront,
    EventForm,
    Events
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
