import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation-service';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '../../services/stripe-service';
import Swal from 'sweetalert2';
import { StripeRequest } from '../../models/stripe-request';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {

  constructor(private res : ReservationService, private route: ActivatedRoute,
    private stripe: StripeService,
  ){}
  id: number = 0;
  aForm: FormGroup = new FormGroup({});

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id; 
        }
    });


    
    this.aForm = new FormGroup(
      {
        firstNameParticipant: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastNameParticipant: new FormControl('', [Validators.required, Validators.minLength(2)]),
        emailParticipant: new FormControl('', [Validators.required, Validators.email]),
        nbPlace: new FormControl('', [Validators.required, Validators.min(1)]),
      });
  }

  onSubmit() {
    if (this.aForm.valid) {
      const reservationData = this.aForm.value;
      this.res.addResrvation(reservationData, this.id).subscribe({
        next: (res) => {
          if (res.status === 'CONFIRMED') {

            const res: StripeRequest = {
              amount: reservationData.nbPlace  * 100, // Montant en cents
              quantity: reservationData.nbPlace,
              name: "Reservation " + reservationData.firstNameParticipant,
              currency: "usd"
            };
            
            this.stripe.checkout(res).subscribe({
              next: (stripeResponse) => {
                if (stripeResponse && stripeResponse.sessionUrl) {
                  window.location.href = stripeResponse.sessionUrl; 
                }
              }});
          } else if (res.status === 'PENDING') {
            
            Swal.fire({
              icon: 'info',
              title: 'Waiting list',
              text: 'Your reservation is on hold. You will be notified by email if a place becomes available.',
              confirmButtonText: 'Ok'
            });
          }
        },
        error: (err) => {
          Swal.fire('Erreur', 'Une erreur est survenue', 'error');
        }
      });
      
    }
  }
}