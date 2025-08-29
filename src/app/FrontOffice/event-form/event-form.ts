import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Event } from '../../models/event';

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
  eventData: Event = new Event();
  ngOnInit() {
    this.aForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        place: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z-, ]*$')]),
        capacityMax: new FormControl('', [Validators.required, Validators.min(1)]),
        price : new FormControl('', [Validators.required, Validators.min(0)]),
      },
      { validators: this.dateValidator } // Ajout du validateur global
    );

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.loadEventData(params['id']);
      }
    });
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
  
  loadEventData(id: number) {
    this.event.getEvent(id).subscribe(data => {
      this.eventData = data;
      this.aForm!.patchValue(data);
      
      console.log(this.aForm!.value);
      console.log(this.aForm!.valid);
      
    });
  } 

  /*addEvent() {
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
  }*/
  
  addEvent() {
    if (this.aForm!.valid) {
      const Data = this.aForm!.value;
  
      // Vérifier si on est en mode update ou ajout
      if (this.eventData.id) {
        // Mode Update
        this.event.updateEvent(Data,this.eventData.id).subscribe({
          next: () => {
            Swal.fire(
              'Your informations!',
              'Event updated successfully ✅',
              'success'
            );
            this.router.navigate(['/listEvents']);
          },
          error: (err) => {
            console.error("Erreur lors de la mise à jour :", err);
            Swal.fire(
              'Error!',
              err.error.message || 'An error occurred while updating event.',
              'error'
            );
          }
        });
  
      } else {
        // Mode Add
        this.event.addEvent(Data).subscribe({
          next: (data) => {
            Swal.fire(
              'Your informations!',
              'Event added successfully 🎉',
              'success'
            );
  
            console.log("Event added:", data);
            this.router.navigate(['/listEvents']);
          },
          error: (err) => {
            if (err.status === 409) {
              Swal.fire(
                'Conflict!',
                err.error?.message || 'Conflict detected!',
                'error'
              );
            } else if (err.status === 500) {
              Swal.fire(
                'Server Error!',
                err.error?.error || 'Unexpected server error.',
                'error'
              );
            } else {
              Swal.fire(
                'Invalid form',
                'Please complete all required fields correctly.',
                'warning'
              );
            }
            
          }
        });
      }
    } else {
      Swal.fire(
        'Invalid form',
        'Please complete all required fields correctly.',
        'warning'
      );
    }
  }
  
  
  
}