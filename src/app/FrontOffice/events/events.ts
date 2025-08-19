import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { Event } from '../../models/event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {

  constructor(private event : EventService) { }

  events: Event[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 3;
  isLoading: boolean = false;


  ngOnInit() {
    this.loadEvents();
    // Initialisation ou logique spécifique pour le composant Events
  }

  loadEvents() {
    this.isLoading = true;
    this.event.getEvents(this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.events = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.isLoading = false;
        console.log("Events loaded:", this.events);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire("Error", "Failed to load events", "error");
        console.error(err);
      }
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadEvents();
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }


}
