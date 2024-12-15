import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);
  selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  selectVehicle(vehicle: Vehicle): void {
    this.selectedVehicleSubject.next(vehicle);
  }
}
