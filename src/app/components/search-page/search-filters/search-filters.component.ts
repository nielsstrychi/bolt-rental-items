import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { FilterSectionComponent } from './filter-section.component';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterSectionComponent],
  template: `
    <div class="h-full bg-white overflow-y-auto p-4" @slideIn>
      <!-- Reset Filters -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-medium">Filter by:</h2>
        <button class="text-sm text-blue-500 hover:text-blue-600">
          Reset all
        </button>
      </div>

      <!-- Rental Type -->
      <app-filter-section title="RENTAL TYPE">
        <div class="flex gap-2">
          <button 
            *ngFor="let type of rentalTypes"
            [class]="getRentalTypeClass(type === selectedRentalType)"
            (click)="selectedRentalType = type">
            {{type}}
          </button>
        </div>
      </app-filter-section>

      <!-- Available Now -->
      <app-filter-section title="AVAILABLE NOW ONLY" [expandable]="false">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" [(ngModel)]="availableNow">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </app-filter-section>

      <!-- Price Range -->
      <app-filter-section title="PRICE RANGE/DAY">
        <div class="space-y-4">
          <div class="h-12 bg-gray-100 rounded-lg"></div>
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <label class="text-xs text-gray-500 mb-1 block">FROM</label>
              <input 
                type="number" 
                [(ngModel)]="priceRange.min"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            </div>
            <div class="flex-1">
              <label class="text-xs text-gray-500 mb-1 block">TO</label>
              <input 
                type="number" 
                [(ngModel)]="priceRange.max"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
            </div>
          </div>
        </div>
      </app-filter-section>

      <!-- Car Brand -->
      <app-filter-section title="CAR BRAND">
        <div class="space-y-2">
          @for (brand of carBrands; track brand.name) {
            <label class="flex items-center gap-2">
              <input 
                type="checkbox" 
                [checked]="brand.selected"
                (change)="brand.selected = !brand.selected"
                class="rounded text-blue-500">
              <span class="text-sm">{{brand.name}}</span>
              <span class="text-xs text-gray-500 ml-auto">({{brand.count}})</span>
            </label>
          }
        </div>
      </app-filter-section>

      <!-- Body Type -->
      <app-filter-section title="BODY TYPE">
        <div class="grid grid-cols-2 gap-2">
          @for (type of bodyTypes; track type.name) {
            <label class="flex items-center gap-2">
              <input 
                type="checkbox" 
                [checked]="type.selected"
                (change)="type.selected = !type.selected"
                class="rounded text-blue-500">
              <span class="text-sm">{{type.name}}</span>
            </label>
          }
        </div>
      </app-filter-section>

      <!-- Transmission -->
      <app-filter-section title="TRANSMISSION">
        <div class="space-y-2">
          @for (type of transmissionTypes; track type.name) {
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="transmission"
                [value]="type.name"
                [(ngModel)]="selectedTransmission"
                class="text-blue-500">
              <span class="text-sm">{{type.name}}</span>
              <span class="text-xs text-gray-500 ml-auto">({{type.count}})</span>
            </label>
          }
        </div>
      </app-filter-section>

      <!-- Fuel Type -->
      <app-filter-section title="FUEL TYPE">
        <div class="space-y-2">
          @for (type of fuelTypes; track type.name) {
            <label class="flex items-center gap-2">
              <input 
                type="checkbox" 
                [checked]="type.selected"
                (change)="type.selected = !type.selected"
                class="rounded text-blue-500">
              <span class="text-sm">{{type.name}}</span>
              <span class="text-xs text-gray-500 ml-auto">({{type.count}})</span>
            </label>
          }
        </div>
      </app-filter-section>
    </div>
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)' }))
      ])
    ])
  ],
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class SearchFiltersComponent {
  rentalTypes = ['Any', 'Per Day', 'Per Hour'];
  selectedRentalType = 'Any';
  availableNow = false;
  priceRange = { min: 22, max: 98 };

  carBrands = [
    { name: 'Ford', count: 156, selected: false },
    { name: 'BMW', count: 89, selected: false },
    { name: 'Audi', count: 78, selected: false },
    { name: 'Mercedes', count: 45, selected: false }
  ];

  bodyTypes = [
    { name: 'Sedan', selected: false },
    { name: 'Coupe', selected: false },
    { name: 'Hatchback', selected: true },
    { name: 'Pickup', selected: false },
    { name: 'Crossover', selected: true },
    { name: 'Sport coupe', selected: false }
  ];

  transmissionTypes = [
    { name: 'Any', count: 966 },
    { name: 'Automatic', count: 142 },
    { name: 'Manual', count: 824 }
  ];
  selectedTransmission = 'Any';

  fuelTypes = [
    { name: 'Diesel', count: 445, selected: true },
    { name: 'Electric', count: 65, selected: false },
    { name: 'Hybrid', count: 120, selected: false }
  ];

  getRentalTypeClass(isActive: boolean): string {
    return `px-4 py-2 text-sm rounded-lg transition-colors ${
      isActive
        ? 'bg-black text-white'
        : 'text-gray-600 hover:bg-gray-50'
    }`;
  }
}
