import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200">
      <div class="flex items-center gap-2 mb-4">
        <span class="material-icons text-gray-400">location_on</span>
        <h3 class="text-sm font-medium">Rent Location</h3>
      </div>

      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span class="material-icons text-gray-400">store</span>
        </div>
        <div>
          <p class="text-sm text-gray-900">4539 Candlewing Rd.</p>
          <p class="text-sm text-gray-500">Darlington, MD, 21034</p>
        </div>
      </div>
    </div>
  `
})
export class OrderLocationComponent {}
