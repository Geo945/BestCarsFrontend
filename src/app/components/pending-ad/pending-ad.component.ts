import { Component, OnInit } from '@angular/core';
import {Car} from "../../objects/Car";
import {CarService} from "../../services/car.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-pending-ad',
  templateUrl: './pending-ad.component.html',
  styleUrls: ['./pending-ad.component.css']
})
export class PendingAdComponent implements OnInit {
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

  public onApprove(car: Car): void{
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        alert("Item approved !");
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert("Something went wrong!");
        this.getCars();
    });
  }

  public onDelete(id: any): void{
    this.carService.deleteCar(id).subscribe(
      (response: void) => {
        alert("Item deleted !");
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert("Something went wrong");
        this.getCars();
      }
    )
  }

}
