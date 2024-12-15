import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCardComponent } from './vehicle-card.component';
import { Vehicle } from '../../../models/vehicle.model';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent],
  template: `
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm">
            <span class="font-medium">966</span> vehicles to rent
          </div>
          <div class="flex items-center gap-4">
            <button class="text-sm text-gray-600 flex items-center gap-1">
              Closest to me
              <span class="material-icons text-[18px]">expand_more</span>
            </button>
            <div class="h-4 border-l border-gray-200"></div>
            <button class="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg">
              <span class="material-icons">map</span>
            </button>
          </div>
        </div>

        <!-- Quick Filters -->
        <div class="flex items-center gap-2">
          @for (filter of quickFilters; track filter) {
            <button class="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-50">
              {{filter}}
            </button>
          }
        </div>
      </div>

      <!-- Vehicle Grid -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for (vehicle of vehicles; track vehicle.id) {
            <app-vehicle-card [vehicle]="vehicle"></app-vehicle-card>
          }
        </div>
      </div>
    </div>
  `
})
export class SearchListComponent {
  quickFilters = ['4+ rating', 'Automatic', '5 seats', 'Diesel'];

  vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'Ford',
      model: 'Focus',
      year: 2024,
      type: '1.5 EcoBlue MT Titanium X',
      price: 24.99,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['Hatchback', 'Manual', 'Diesel', '5 seats'],
      images: ['https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3'],
      rating: 4.7,
      reviews: 125,
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      brand: 'BMW',
      model: '3 Series',
      year: 2024,
      type: '320d xDrive M Sport',
      price: 35.99,
      transmission: 'Automatic',
      fuel: 'Diesel',
      features: ['Sedan', 'Automatic', 'Diesel', '5 seats'],
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3'],
      rating: 4.9,
      reviews: 89,
      location: 'San Francisco, CA'
    },
    {
      id: '3',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2024,
      type: 'Long Range Dual Motor',
      price: 45.99,
      transmission: 'Automatic',
      fuel: 'Electric',
      features: ['Sedan', 'Automatic', 'Electric', '5 seats'],
      images: ['https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-4.0.3'],
      rating: 4.8,
      reviews: 156,
      location: 'San Francisco, CA'
    },
    {
      id: '4',
      brand: 'Audi',
      model: 'A4',
      year: 2024,
      type: '40 TFSI S line',
      price: 38.99,
      transmission: 'Automatic',
      fuel: 'Petrol',
      features: ['Sedan', 'Automatic', 'Petrol', '5 seats'],
      images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3'],
      rating: 4.6,
      reviews: 92,
      location: 'San Francisco, CA'
    },
    {
      id: '5',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2024,
      type: 'C200 AMG Line',
      price: 42.99,
      transmission: 'Automatic',
      fuel: 'Petrol',
      features: ['Sedan', 'Automatic', 'Petrol', '5 seats'],
      images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3'],
      rating: 4.9,
      reviews: 78,
      location: 'San Francisco, CA'
    },
    {
      id: '6',
      brand: 'Toyota',
      model: 'RAV4',
      year: 2024,
      type: 'Hybrid Dynamic Force',
      price: 32.99,
      transmission: 'Automatic',
      fuel: 'Petrol',
      features: ['SUV', 'Automatic', 'Hybrid', '5 seats'],
      images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3'],
      rating: 4.7,
      reviews: 145,
      location: 'San Francisco, CA'
    }
  ];
}
