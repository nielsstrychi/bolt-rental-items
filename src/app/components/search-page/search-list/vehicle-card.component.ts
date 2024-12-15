import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../models/vehicle.model';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      (click)="onSelect()">
      <!-- Image -->
      <div class="relative">
        <img [src]="vehicle.images[0]" [alt]="vehicle.model" class="w-full h-48 object-cover">
        <button 
          class="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md"
          (click)="onFavorite($event)">
          <span class="material-icons text-gray-400">favorite_border</span>
        </button>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Header -->
        <div class="flex items-start justify-between mb-2">
          <div>
            <h3 class="font-medium">{{vehicle.brand}} {{vehicle.model}}</h3>
            <div class="text-xs text-gray-500">{{vehicle.type}}</div>
          </div>
          <div class="text-right">
            <div class="font-medium">{{vehicle.price | currency}}</div>
            <div class="text-xs text-gray-500">/hour</div>
          </div>
        </div>

        <!-- Features -->
        <div class="flex items-center gap-4 text-xs text-gray-600 mb-3">
          <div class="flex items-center gap-1">
            <span class="material-icons text-[16px]">settings</span>
            {{vehicle.transmission}}
          </div>
          <div class="flex items-center gap-1">
            <span class="material-icons text-[16px]">local_gas_station</span>
            {{vehicle.fuel}}
          </div>
          <div class="flex items-center gap-1">
            <span class="material-icons text-[16px]">person</span>
            5
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <span class="material-icons text-yellow-400 text-[16px]">star</span>
            <span class="text-sm ml-1">{{vehicle.rating}}</span>
          </div>
          <span class="text-xs text-gray-500">({{vehicle.reviews}} reviews)</span>
        </div>
      </div>
    </div>
  `
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;

  constructor(private vehicleService: VehicleService) {}

  onSelect(): void {
    this.vehicleService.selectVehicle(this.vehicle);
  }

  onFavorite(event: Event): void {
    event.stopPropagation();
    // Implement favorite functionality
  }
}
