import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {

  constructor(private res : ReservationService, private route: ActivatedRoute){}
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
      this.res.addResrvation(reservationData,this.id).subscribe({
        next: (response) => {
          console.log("Reservation created successfully:", response);
          // Logique pour rediriger ou afficher un message de succès
        },
        error: (error) => {
          console.error("Error creating reservation:", error);
          // Logique pour gérer l'erreur
        }
      });
      
    } else {
      console.error("Form is invalid:", this.aForm.errors);
    }
  }
  

}