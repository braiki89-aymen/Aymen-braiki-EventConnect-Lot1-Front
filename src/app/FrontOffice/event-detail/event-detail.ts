import { Component } from '@angular/core';
import { EventService } from '../../services/event-service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../../services/feedback-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-event-detail',
  standalone: false,
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail {

  constructor(private event : EventService, private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    
  ) { }
  stars: number[] = [1,2,3,4,5];
  newFeedback: Feedback = { rating: 0 };
  rating: number =0;
  feedbacks : Feedback[] = [];
  id: number = 0;
  eventData: Event |  undefined 
  averageRating: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id; 
        this.loadEventData(this.id);
        this.loadFeedbacks(this.id);
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

  setRating(value: number) {
    this.newFeedback.rating = value;
    this.feedbackService.addFeedback(this.newFeedback, this.id).subscribe(() => {
      this.loadFeedbacks(this.id);
      this.newFeedback = { rating: 0 }; 
    });
  }

  loadFeedbacks(id: number) {
    this.feedbackService.getFeedbacksByEvent(id).subscribe(res => this.feedbacks = res);
    this.feedbackService.getAverageRating(id).subscribe(res => this.averageRating = res);
  }

  submitFeedback() {
    if (this.newFeedback) {
      this.feedbackService.addFeedback(this.newFeedback, this.id).subscribe(() => {
        this.loadFeedbacks(this.id);
        this.rating = 0;
      });
    } else {
      console.error("Feedback is undefined. Cannot submit feedback.");
    }
  }

  

}
