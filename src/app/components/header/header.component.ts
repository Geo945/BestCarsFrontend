import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {Person} from "../../objects/Person";
import {PersonService} from "../../services/person.service";
import {CarService} from "../../services/car.service";
import {Form, NgForm} from "@angular/forms";
import {Car} from "../../objects/Car";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = "BestCars";
  // @ts-ignore
  public onlineUser: Person = { "username": ''};
  // @ts-ignore
  public selectedFiles : File[];//for the selectedFile(image) on add car offer

  //password change vars
  public onSuccessChangePasswordMessage: string = '';
  public currentPassword: string = '';
  public newPassword: string = '';
  public confNewPassword: string = '';

  constructor(private router: Router, private personService: PersonService, private carService: CarService) {
    this.personService.myMethod$.subscribe(
      (person: Person) =>{
        this.onlineUser = person;

      }
    )
  }

  ngOnInit(): void {
    console.log(this.onlineUser);
  }

  public hasRoute(route: String): boolean{
    return this.router.url==route;
  }

//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  //  Launch demo modal
 // </button>
  public logout(): void {
    this.onlineUser = {
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      personCode: '',
      imageUrl: '',
      phoneNumber: '',
      role: '',
    }

  }

  public onOpenModal(person: Person, mode: string): void{
    const container = document.getElementById("navbarSupportedContent");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'; //hide the btn
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addCarModal');//# because i am refering an id
    }
    if(mode === 'changePassword'){
      button.setAttribute('data-target','#changePasswordModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onAddCarOffer(addCarForm: NgForm): void{
    addCarForm.value.person=this.onlineUser;
    console.log(addCarForm.value);

    this.carService.addCar(addCarForm.value).subscribe(
      (response: Car) => {
        console.log(response);
        addCarForm.reset();
        this.onSuccessChangePasswordMessage = 'Password changed successfully!';
      },
      (error: HttpErrorResponse) => {
        alert("Something went wrong");
        addCarForm.reset();
      });
  }

  public changeUserPassword(changePasswordForm: NgForm): void{


    if(this.newPassword !== this.confNewPassword){
      alert("New passwords doesn't match");
      return;
    }
  //  if(this.currentPassword !== this.onlineUser.password) {
    //  alert("Something went wrong!\nPlease try again.");
    //  return;
   // }
    //TODO: request la backend care verifica daca currentPassword = onlineUser.password
    let p = changePasswordForm.value;
    console.log(p.value);
    this.personService.changePersonPassword(p).subscribe(
      (response: Person) => {
        this.onSuccessChangePasswordMessage = 'Password changed successfully !';
        changePasswordForm.reset();
    },
      (error: HttpErrorResponse) => {
        alert("Something went wrong !");
        changePasswordForm.reset();
      }
    )

  }

  public onFilesSelected(event: any){
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  public onCloseChangePasswordModal(){
    this.onSuccessChangePasswordMessage='';
  }

}
