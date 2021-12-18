import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../services/person.service";
import {NgForm} from "@angular/forms";
import {Person} from "../../objects/Person";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  public onAddPerson(addPersonForm: NgForm): void{
    this.personService.addPerson(addPersonForm.value).subscribe(
      (person: Person) =>{
        console.log(person);
        addPersonForm.reset();
        alert("Register success");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addPersonForm.reset();
      }
    );
  }

}
