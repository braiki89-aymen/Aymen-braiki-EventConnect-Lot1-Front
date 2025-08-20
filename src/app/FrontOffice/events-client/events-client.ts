import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Event } from '../../models/event';

@Component({
  selector: 'app-events-client',
  standalone: false,
  templateUrl: './events-client.html',
  styleUrl: './events-client.scss'
})
export class EventsClient {

  constructor(private event: EventService, private router: Router) { }

  events: Event[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 3;
  isLoading: boolean = false;
  
  ngOnInit() {
    this.loadEvents();
    
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
