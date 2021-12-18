import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../services/person.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Person} from "../../objects/Person";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  public logedInPerson: Person = null;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  public onPersonLogin(loginForm: NgForm): void{
    this.personService.loginPerson(loginForm.value).subscribe(
      (person: Person) =>{
        try {
          // @ts-ignore
          document.getElementById("onSuccessLogin").click();
        }catch (e){
          console.log(e);
        }
        this.logedInPerson = person;
        console.log(this.logedInPerson);
        loginForm.reset();
        this.personService.myMethod(this.logedInPerson);
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        alert("Invalid credentials !");
        loginForm.reset();
      }
    )
  }

}
