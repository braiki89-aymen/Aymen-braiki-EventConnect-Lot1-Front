import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private eventUrl = 'http://localhost:8080/events'; // URL to web API

  addEvent(event: Event) {
    return this.http.post<Event>(`${this.eventUrl}/addEvent`, event);
  }
  
  getEvent(id: number) {
    return this.http.get<Event>(`${this.eventUrl}/retrieve-event/${id}`);
  }

  getEvents(page: number = 0, size: number = 3): Observable<any> {
    return this.http.get<any>(`${this.eventUrl}/AllEvents?page=${page}&size=${size}`);
  }
  

  deleteEvent(id: number) {
    return this.http.delete(`${this.eventUrl}/remove-event/${id}`);
  }

  updateEvent(event: Event, id: number) {
    return this.http.put<Event>(`${this.eventUrl}/update-event/${id}`, event);
  }
  
}
  

