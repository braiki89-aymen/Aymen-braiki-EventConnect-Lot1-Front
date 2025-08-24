import { Component } from '@angular/core';
import { ReservationService } from '../../services/reservation-service';
import { Reservation } from '../../models/reservation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-participant',
  standalone: false,
  templateUrl: './list-participant.html',
  styleUrl: './list-participant.scss'
})
export class ListParticipant {

  constructor(private res : ReservationService, private route: ActivatedRoute) { }

  Confirmedparticipants: Reservation[] = [];
  pendingParticipants: Reservation[] = [];
  id : number = 0;
  isLoading: boolean = false;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id; 
        this.loadConfirmedParticipants(this.id);
        this.loadPendingParticipants(this.id);
      }
    });

   
  }

  loadConfirmedParticipants(id: number) {
    this.res.listConfirmed(this.id).subscribe({
      next: (data) => {
        this.Confirmedparticipants = data;
        console.log("Confirmed participants loaded:", this.Confirmedparticipants);
      },
      error: (err) => {
        console.error("Failed to load confirmed participants:", err);
      }
    });
  }

  loadPendingParticipants(id: number) {
    this.res.listPending(this.id).subscribe({
      next: (data) => {
        this.pendingParticipants = data;
        console.log("Pending participants loaded:", this.pendingParticipants);
      },
      error: (err) => {
        console.error("Failed to load pending participants:", err);
      }
    });
  }
  
}
