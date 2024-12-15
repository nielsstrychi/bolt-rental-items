import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { DateRangePickerComponent } from '../../shared/date-range-picker/date-range-picker.component';
import { DropdownDirective } from '../../../directives/dropdown.directive';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule, DropdownComponent, DateRangePickerComponent, DropdownDirective],
  template: `
    <div class="relative" appDropdown [(isOpen)]="isOpen">
      <button 
        (click)="toggle()"
        class="border border-gray-300 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
        <span class="material-icons text-gray-500 text-[18px]">{{icon}}</span>
        <span class="text-gray-700 font-medium">{{label}}:</span>
        <span class="text-gray-500">{{value}}</span>
        <span class="material-icons text-gray-400 text-[18px]">expand_more</span>
      </button>
      
      @if (label === 'Date range' && showDatePicker) {
        <div class="absolute z-20 mt-2 w-80 rounded-lg bg-white shadow-lg border border-gray-200">
          <app-date-range-picker
            [initialStartDate]="customDateRange?.start"
            [initialEndDate]="customDateRange?.end"
            (onApply)="onCustomDateRange($event)"
            (onCancel)="showDatePicker = false">
          </app-date-range-picker>
        </div>
      } @else if (isOpen) {
        <div class="absolute z-20 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-2">
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
      }
    </div>
  `
})
export class FilterButtonComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() value!: string;
  @Input() options: Array<{ label: string; value: string; count?: number }> = [];
  @Input() selectedValue: string = '';
  @Input() customDateRange?: { start: string; end: string };
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDateRangeSelect = new EventEmitter<{ start: string; end: string }>();

  isOpen = false;
  showDatePicker = false;

  toggle(): void {
    if (this.label === 'Date range' && this.selectedValue === 'Custom') {
      this.showDatePicker = true;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: { label: string; value: string }): void {
    if (this.label === 'Date range' && option.value === 'Custom') {
      this.showDatePicker = true;
    } else {
      this.onSelect.emit(option.value);
    }
    this.isOpen = false;
  }

  onCustomDateRange(range: { start: string; end: string }): void {
    this.showDatePicker = false;
    this.onDateRangeSelect.emit(range);
  }
}
