import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Person} from "../objects/Person";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public baseUrl : string = environment.apiBaseUrl
  myMethod$: Observable<Person>;
  private myMethodSubject = new Subject<Person>();

  constructor(private httpClient: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  public getAllUsers(): Observable<Person[]>{
    return this.httpClient.get<Person[]>(`${this.baseUrl}/person/all`);
  }

  public addPerson(person: Person): Observable<Person>{
      return this.httpClient.post<Person>(`${this.baseUrl}/person/add`, person);
  }

  public loginPerson(person: Person): Observable<Person>{
    return this.httpClient.post<Person>(`${this.baseUrl}/person/login`, person);
  }

  public deletePerson(id: any): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/person/delete/${id}`);
  }

  public updatePerson(person: Person): Observable<Person>{
    return this.httpClient.put<Person>(`${this.baseUrl}/person/update`, person);
  }

  public changePersonPassword(person: Person): Observable<Person>{
    return this.httpClient.put<Person>(`${this.baseUrl}/person/changePassword`, person);
  }

  myMethod(person: Person){
    console.log(person);
    this.myMethodSubject.next(person);
  }



}
