import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceOption } from '../../../models/insurance-option.model';
import { VehicleFeature } from '../../../models/vehicle-feature.model';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';

@Component({
  selector: 'app-search-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-detail.component.html'
})
export class SearchDetailComponent implements OnInit {
  activeTab = 'Rent details';
  tabs = ['Rent details', 'Vehicle info', 'Statistics', 'Documents'];
  selectedVehicle: Vehicle | null = null;

  features: VehicleFeature[] = [
    { icon: 'settings', label: 'Transmission', value: 'Manual' },
    { icon: 'local_gas_station', label: 'Fuel', value: 'Diesel' },
    { icon: 'speed', label: 'Mileage', value: '15,000 km' },
    { icon: 'event', label: 'Year', value: '2024' }
  ];

  insuranceOptions: InsuranceOption[] = [
    {
      label: 'No insurance',
      value: 'none',
      price: 0,
      description: 'All responsibility for damage lies with you'
    },
    {
      label: 'Vehicle protection',
      value: 'basic',
      price: 55.00,
      description: 'Covers damage to the rental vehicle'
    },
    {
      label: '3rd party liability',
      value: 'liability',
      price: 65.00,
      description: 'Covers damage to other vehicles and property'
    }
  ];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.selectedVehicle$.subscribe(vehicle => {
      this.selectedVehicle = vehicle;
      if (vehicle) {
        this.updateFeatures(vehicle);
      }
    });
  }

  private updateFeatures(vehicle: Vehicle) {
    this.features = [
      { icon: 'settings', label: 'Transmission', value: vehicle.transmission },
      { icon: 'local_gas_station', label: 'Fuel', value: vehicle.fuel },
      { icon: 'speed', label: 'Mileage', value: '15,000 km' },
      { icon: 'event', label: 'Year', value: vehicle.year.toString() }
    ];
  }

  getTabClass(isActive: boolean): string {
    return `px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
      isActive
        ? 'text-blue-500 border-blue-500'
        : 'text-gray-500 border-transparent hover:text-gray-900'
    }`;
  }
}
