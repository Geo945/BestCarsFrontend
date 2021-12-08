import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Person} from "../objects/Person";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl : string = environment.apiBaseUrl
  constructor(private httpClient: HttpClient) { }

  public addPerson(person: Person): Observable<Person>{
      return this.httpClient.post<Person>(`${this.baseUrl}/person/add`, person);
  }
}
