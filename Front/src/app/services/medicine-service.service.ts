import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../model/medicine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineServiceService {
  apiUrl = 'http://localhost:4000/PharmaLab';

  constructor(public httpClient: HttpClient) {}

  public addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.httpClient.post<Medicine>(
      this.apiUrl + '/addMedicine',
      medicine,
      { withCredentials: true }
    );
  }

  public getMedicines(user: User): Observable<Medicine[]> {
    return this.httpClient.get<Medicine[]>(this.apiUrl + '/getMedicine', {
      withCredentials: true,
    });
  }
}
