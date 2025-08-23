import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFront } from './FrontOffice/all-template-front/all-template-front';
import { EventForm } from './FrontOffice/event-form/event-form';
import { Events } from './FrontOffice/events/events';
import { EventsClient } from './FrontOffice/events-client/events-client';
import { EventDetail } from './FrontOffice/event-detail/event-detail';
import { Reservation } from './FrontOffice/reservation/reservation';
import { CancelReservation } from './FrontOffice/cancel-reservation/cancel-reservation';

const routes: Routes = [
  {path:"", component: AllTemplateFront,
    children: [
      {path:"", component: EventForm},
      {path:"listEvents", component: Events},
      {path:"clientEvents", component: EventsClient},
      {path:"eventDetail/:id", component: EventDetail}, 
      {path:"reservation/:id", component: Reservation}, 
      {path:"cancelReservation", component: CancelReservation}, 
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
