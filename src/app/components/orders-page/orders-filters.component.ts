import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-4 mb-6">
      <div class="search-box flex-grow relative">
        <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        <input 
          type="text" 
          placeholder="Search order, product, customer"
          class="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
        >
      </div>
      
      <div class="flex items-center gap-3">
        <button class="filter-btn">
          <span class="material-icons text-gray-500 mr-2">calendar_today</span>
          Date range: Last 30 days
        </button>
        <button class="filter-btn">
          <span class="material-icons text-gray-500 mr-2">filter_list</span>
          Channel: All (10)
        </button>
        <button class="filter-btn">
          <span class="material-icons text-gray-500 mr-2">tune</span>
          Order status: All (10)
        </button>
      </div>
    </div>

    <div class="flex gap-4 mb-6">
      <button class="view-btn active">Card view</button>
      <button class="view-btn">Calendar</button>
    </div>
  `,
  styles: [`
    .filter-btn {
      @apply border border-gray-300 px-4 py-2 rounded-lg text-sm flex items-center whitespace-nowrap;
    }
    .view-btn {
      @apply px-4 py-2 rounded-lg text-sm;
    }
    .view-btn.active {
      @apply bg-black text-white;
    }
    :not(.active).view-btn {
      @apply text-gray-500;
    }
  `]
})
export class OrdersFiltersComponent {}
