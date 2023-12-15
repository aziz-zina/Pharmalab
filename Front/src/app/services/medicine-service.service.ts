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

  public updateMedicine(medicine: Medicine): Observable<any> {
    return this.httpClient.patch(this.apiUrl + '/updateMedicine', medicine, {
      withCredentials: true,
    });
  }

  public deleteMedicine(medicine: Medicine): Observable<any> {
    const options = {
      body: medicine,
      withCredentials: true,
    };
    return this.httpClient.delete(this.apiUrl + '/deleteMedicine', options);
  }

  public getAllValidMedicines(): Observable<Medicine[]> {
    return this.httpClient.get<Medicine[]>(this.apiUrl + '/validMedicines', {
      withCredentials: true,
    });
  }

  public getAllValidLaboratories(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl + '/labs', {
      withCredentials: true,
    });
  }

  public getAllMedicines(): Observable<Medicine[]> {
    return this.httpClient.get<Medicine[]>(this.apiUrl + '/medicines', {
      withCredentials: true,
    });
  }
}
