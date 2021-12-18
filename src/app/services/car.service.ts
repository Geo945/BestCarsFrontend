import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Car} from "../objects/Car";
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public baseUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public addCar(car: Car): Observable<Car>{
    return this.httpClient.post<Car>(`${this.baseUrl}/car/add`, car);
  }

  public getCars(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.baseUrl}/car/all`);
  }

  public updateCar(car: Car): Observable<Car>{
    return this.httpClient.put<Car>(`${this.baseUrl}/car/approveAd`, car);
  }

  public deleteCar(id: any): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/car/deleteAd/${id}`);
  }
}
