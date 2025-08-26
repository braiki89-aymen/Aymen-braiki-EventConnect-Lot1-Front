import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReservationService } from '../../services/reservation-service';
import { EventService } from '../../services/event-service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../../services/feedback-service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-statistique',
  standalone: false,
  templateUrl: './statistique.html',
  styleUrl: './statistique.scss'
})
export class Statistique implements OnInit, AfterViewInit {
  @ViewChild('reservationChart', { static: false }) chartRef!: ElementRef;





  constructor(private res : ReservationService, private event : EventService, 
    private route : ActivatedRoute , private feedbackService: FeedbackService) { }

  confirmedCount: number = 0;
  pendingCount: number = 0;
  eventCount: number = 0;
  topParticipant: any [] = [];
  countReservation: [string, number][] = [];
  totalReservations: number = 0;
  feedbacks : Feedback[] = [];
  averageRating: number = 0;
  id : number = 0;
  reservationChart: any;

  ngAfterViewInit() {
    // Le graphique sera initialisé une fois que les données seront chargées
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id; 
    this.loadConfirmedCount(this.id);
    this.loadPendingCount(this.id);
    this.loadTopParticipants();
    this.loadReservationCounts();
    this.loadEventCount();
    this.loadFeedbacks(this.id);
      }
   }); 

   
   
  

  
  
  }

  initializeChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.reservationChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Confirmed', 'Waiting'],
        datasets: [{
          data: [this.confirmedCount, this.pendingCount],
          backgroundColor: [
            '#2ecc71',
            '#f39c12'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }


  loadConfirmedCount(id: number) {
    this.res.confirmReservation(id).subscribe({
      next: (data) => {
        this.confirmedCount = data;
        if (this.pendingCount !== undefined) {
          this.initializeChart();
        }
        
        console.log("Confirmed count loaded:", this.confirmedCount);
      },
      error: (err) => {
        console.error("Failed to load confirmed count:", err);
      }
    });
  }

  loadPendingCount(id: number) {
    this.res.pendingReservation(id).subscribe({
      next: (data) => {
        this.pendingCount = data;
        if (this.confirmedCount !== undefined) {
          this.initializeChart();
        }
        console.log("Pending count loaded:", this.pendingCount);
      },
      error: (err) => {
        console.error("Failed to load pending count:", err);
      }
    });
  }
  loadTopParticipants() {
    this.res.topParticipant().subscribe({
      next: (data : any[]) => {
        this.topParticipant = data;
        this.topParticipant = data.map(row => ({
          emailParticipant: row[0],
          firstNameParticipant: row[1],
          lastNameParticipant: row[2],
          total: row[3]
        }));
        
        console.log("Top participants loaded:", this.topParticipant);
      },
      error: (err) => {
        console.error("Failed to load top participants:", err);
      }
    });
  }

  loadReservationCounts() {
    this.res.countAllReservation().subscribe({
      next: (data : any) => {
        this.countReservation = data;

        console.log("Reservation counts loaded:", this.countReservation);
      },
      error: (err) => {
        console.error("Failed to load reservation counts:", err);
      }
    });
  }

  loadEventCount() {
    this.event.countAllEvent().subscribe({
      next: (data) => {
        this.eventCount = data;
        console.log("Event count loaded:", this.eventCount);
      },
      error: (err) => {
        console.error("Failed to load event count:", err);
      }
    });
  }

  loadFeedbacks(id: number) {
    this.feedbackService.getFeedbacksByEvent(id).subscribe(res => this.feedbacks = res);
    this.feedbackService.getAverageRating(id).subscribe(res => this.averageRating = res);
  }

  
  
}
