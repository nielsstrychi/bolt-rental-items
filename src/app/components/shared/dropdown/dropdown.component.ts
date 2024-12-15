import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div 
        *ngIf="isOpen" 
        class="fixed inset-0 z-10"
        (click)="close()">
      </div>
      <div 
        *ngIf="isOpen"
        class="absolute z-20 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-2">
        <div class="max-h-64 overflow-y-auto">
          @for (option of options; track option.value) {
            <button
              (click)="selectOption(option)"
              class="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center justify-between"
              [class.text-black]="option.value === selectedValue"
              [class.font-medium]="option.value === selectedValue">
              <span>{{option.label}}</span>
              @if (option.count !== undefined) {
                <span class="text-gray-400">{{option.count}}</span>
              }
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent {
  @Input() options: Array<{ label: string; value: string; count?: number }> = [];
  @Input() selectedValue: string = '';
  @Output() onSelect = new EventEmitter<string>();
  
  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  selectOption(option: { value: string }): void {
    this.onSelect.emit(option.value);
    this.close();
  }
}
