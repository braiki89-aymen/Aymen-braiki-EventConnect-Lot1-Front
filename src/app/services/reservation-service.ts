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


  addResrvation(reservation: Reservation, id: number): Observable<Reservation> { 
    return this.http.post<Reservation>(`${this.reservationUrl}/addReservation/${id}`, reservation);
  }

  cancelReservation (cancel:any){
    return this.http.post(`${this.reservationUrl}/cancelReservation`, cancel)
  }

  checkReservation(cancelData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.reservationUrl}/checkReservation`, cancelData);
  }

  listConfirmed(id :number) : Observable <Reservation []> {
    return this.http.get<Reservation []>(`${this.reservationUrl}/confirmed/${id}`);
  }
  
  listPending(id :number) : Observable <Reservation []> {
    return this.http.get<Reservation []>(`${this.reservationUrl}/pending/${id}`);
  }

  confirmReservation(id: number): Observable<any> {
    return this.http.get<any>(`${this.reservationUrl}/countConfirmed/${id}`);
  }

  pendingReservation(id: number): Observable<any> {
    return this.http.get<any>(`${this.reservationUrl}/countPending/${id}`);
  }

  topParticipant(): Observable<any []> {
    return this.http.get<any[]>(`${this.reservationUrl}/topParticipant`);
  }

  countAllReservation(): Observable<any []> {
    return this.http.get<any[]>(`${this.reservationUrl}/countAllReservation`);
  }

  
}
