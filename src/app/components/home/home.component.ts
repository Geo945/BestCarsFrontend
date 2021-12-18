import { Component, OnInit } from '@angular/core';
import {Car} from "../../objects/Car";
import {CarService} from "../../services/car.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cars: Car[] =[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  public getCars(): void{
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars=response;
      },
      (error: HttpErrorResponse) => {
        alert("Something went wrong!");
      });
  }

  public getPersonPhoneById(id: any): string{
    return "07273774";
  }

}
