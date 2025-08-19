import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFront } from './FrontOffice/all-template-front/all-template-front';
import { EventForm } from './FrontOffice/event-form/event-form';
import { Events } from './FrontOffice/events/events';

const routes: Routes = [
  {path:"", component: AllTemplateFront,
    children: [
      {path:"", component: EventForm},
      {path:"listEvents", component: Events}, // Assuming you want to use the same component for listing events
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
