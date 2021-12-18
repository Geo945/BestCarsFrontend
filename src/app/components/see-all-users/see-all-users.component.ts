import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Person} from "../../objects/Person";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-see-all-users',
  templateUrl: './see-all-users.component.html',
  styleUrls: ['./see-all-users.component.css']
})
export class SeeAllUsersComponent implements OnInit {
  public users: Person[]=[];
  // @ts-ignore
  public editPerson: Person;

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void{
    this.personService.getAllUsers().subscribe(
      (response: Person[]) => {
        this.users=response;
    },
      (error: HttpErrorResponse) =>{
        alert("Something went wrong!");
      }
    )
  }

  public onUpdateUser(person: Person){
    this.personService.updatePerson(person).subscribe(
      (response: Person) => {
          this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        alert("Something went wrong ! ");
      }
    )
    // @ts-ignore
    document.getElementById("closeEdit").click();
  }

  public onDeleteUser(personId: any){
    this.personService.deletePerson(personId).subscribe(
      (response: void)=>{
        this.getAllUsers();
      },
      (error: HttpErrorResponse)=>{
        alert("Something went wrong !");
        this.getAllUsers();
      }
    )
  }

  public onOpenModal(person: Person, mode: string): void{
    const container = document.getElementById("container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'; //hide the btn
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit') {
      this.editPerson = person;
      button.setAttribute('data-target', '#editUserModal');//# because i am refering an id
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
