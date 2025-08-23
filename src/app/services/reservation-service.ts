import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  private reservationUrl = 'http://localhost:8080/reservation';


  addResrvation(reservation: Reservation, id: number) { 
    return this.http.post(`${this.reservationUrl}/addReservation/${id}`, reservation);
  }

  cancelReservation (cancel:any){
    return this.http.post(`${this.reservationUrl}/cancelReservation`, cancel)
  }

  checkReservation(cancelData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.reservationUrl}/checkReservation`, cancelData);
  }
  
}
