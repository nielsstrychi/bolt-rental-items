import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-order-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-900 transition-colors">
      <span class="material-icons text-[18px]">add</span>
      Add Order
    </button>
  `
})
export class AddOrderButtonComponent {}
