import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative flex-grow max-w-xl">
      <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
      <input 
        type="text" 
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearch.emit($event)"
        placeholder="Search order, product, customer"
        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
      >
    </div>
  `
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() onSearch = new EventEmitter<string>();
}
