import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-form',
  standalone: false,
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss'
})
export class EventForm {

  constructor(private event: EventService,private route: ActivatedRoute,
    private router: Router
  ) { }

  aForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.aForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        place: new FormControl('', [Validators.required, Validators.minLength(3)]),
        capacityMax: new FormControl('', [Validators.required, Validators.min(1)])
      },
      { validators: this.dateValidator } // Ajout du validateur global
    );
  }

  // Validateur personnalisé pour vérifier les dates
  dateValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (start && end && new Date(start) > new Date(end)) {
      return { dateInvalid: true };
    }
    return null;
  }
  


  addEvent() {
    this.event.addEvent(this.aForm.value).subscribe({
      next: (data) => {
        // Affiche un message success avec SweetAlert2
        Swal.fire(
          'Your informations!',
          'Event added with success',
          'success'
        );
  
        console.log("Event added:", data);
  
        // Redirection après l'ajout
        this.router.navigate(['/listEvents']);
      },
      error: (err) => {
        if (err.status === 409 || err.status === 500) {
          // Message d'erreur spécifique venant du backend
          Swal.fire(
            'Conflict!',
            err.error.message,
            'error'
          );
        } else {
          console.error("Unexpected error:", err);
  
          // Message générique d'erreur
          Swal.fire(
            'Error!',
            'An unexpected error occurred. Please try again.',
            'error'
          );
        }
      }
    });
  }
  
  
}