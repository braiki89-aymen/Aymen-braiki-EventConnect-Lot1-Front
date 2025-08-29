import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation-service';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../../services/stripe-service';
import Swal from 'sweetalert2';
import { StripeRequest } from '../../models/stripe-request';
import { DiscountService } from '../../services/discount-service';
import { of } from 'rxjs';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {

  constructor(private res : ReservationService, private route: ActivatedRoute,
    private stripe: StripeService, private dis : DiscountService,
    private router: Router
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
        discountCode: new FormControl(''),
      });
  }

  onSubmit() {
    if (this.aForm.valid) {
      const reservationData = this.aForm.value;
      const code = this.aForm.get('discountCode')?.value;
  
      // Vérifie le code promo
      const checkCode$ = code ? this.dis.checkCode(code) : of(true); 

    checkCode$.subscribe({
      next: (exists: boolean) => {
        if (!exists) {
          Swal.fire({
            title: "Not Found",
            text: "Invalid Discount Code.",
            icon: "error"
          });
          return; // stop si code invalide
        }
  
          
          this.res.addReservation(reservationData, this.id, code).subscribe({
            next: (reservation) => {
              if (reservation.status === 'CONFIRMED') {
  
                const stripeRequest: StripeRequest = {
                  amount: reservation.amount * 100 , 
                  quantity: reservationData.nbPlace,
                  name: "Reservation " + reservationData.firstNameParticipant,
                  currency: "usd"
                };
                
                this.stripe.checkout(stripeRequest).subscribe({
                  next: (stripeResponse) => {
                    if (stripeResponse?.sessionUrl) {
                      window.location.href = stripeResponse.sessionUrl;
                    }
                  },
                  error: () => {
                    Swal.fire('Erreur Stripe', 'Impossible de créer la session Stripe.', 'error');
                  }
                });
  
              } else if (reservation.status === 'PENDING') {
                Swal.fire({
                  icon: 'info',
                  title: 'Waiting list',
                  text: 'Your reservation is on hold. You will be notified by email if a place becomes available.',
                  confirmButtonText: 'Ok'
                });
                this.router.navigate(['/clientEvents']);
              }
            },
            error: (err) => {
              Swal.fire('Erreur', err.error?.error || 'Une erreur est survenue', 'error');
            }
          });
  
        },
        error: () => {
          Swal.fire('Erreur', 'Impossible de vérifier le code promo.', 'error');
        }
      });
    }
  }
  
}
