import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from './trip';
//import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get<Trip[]>('/api/');
  }
}
