import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-detail',
  standalone: false,
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail {

  constructor(private event : EventService, private route: ActivatedRoute) { }

  id: number = 0;
  eventData: Event |  undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id; 
        this.loadEventData(this.id);
      }
    });
  }


  loadEventData(id: number) {
    this.event.getEvent(id).subscribe({
      next: (data) => {
        this.eventData = data;
        console.log("Event data loaded:", this.eventData);
      },
      error: (err) => {
        console.error("Failed to load event data:", err);
      }
    });
  }



  

}
