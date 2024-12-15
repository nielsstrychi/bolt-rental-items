import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input
          type="datetime-local"
          [(ngModel)]="startDate"
          (ngModelChange)="onDateChange()"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
        >
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
        <input
          type="datetime-local"
          [(ngModel)]="endDate"
          (ngModelChange)="onDateChange()"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
        >
      </div>
      <div class="flex justify-end gap-2">
        <button
          (click)="onCancel.emit()"
          class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          Cancel
        </button>
        <button
          (click)="applyRange()"
          [disabled]="!isValidRange"
          class="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Apply
        </button>
      </div>
    </div>
  `
})
export class DateRangePickerComponent {
  @Input() initialStartDate?: string;
  @Input() initialEndDate?: string;
  @Output() onApply = new EventEmitter<{ start: string; end: string }>();
  @Output() onCancel = new EventEmitter<void>();

  startDate: string = '';
  endDate: string = '';
  isValidRange: boolean = false;

  ngOnInit() {
    if (this.initialStartDate) {
      this.startDate = this.formatDateForInput(new Date(this.initialStartDate));
    }
    if (this.initialEndDate) {
      this.endDate = this.formatDateForInput(new Date(this.initialEndDate));
    }
    this.validateRange();
  }

  onDateChange() {
    this.validateRange();
  }

  validateRange() {
    if (!this.startDate || !this.endDate) {
      this.isValidRange = false;
      return;
    }

    const start = new Date(this.startDate).getTime();
    const end = new Date(this.endDate).getTime();
    this.isValidRange = start < end;
  }

  applyRange() {
    if (this.isValidRange) {
      this.onApply.emit({
        start: this.startDate,
        end: this.endDate
      });
    }
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().slice(0, 16);
  }
}
