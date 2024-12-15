import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <button 
          (click)="onPreviousWeek.emit()"
          class="p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <span class="material-icons text-gray-400">chevron_left</span>
        </button>
        <button 
          (click)="onNextWeek.emit()"
          class="p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <span class="material-icons text-gray-400">chevron_right</span>
        </button>
        <button 
          (click)="onToday.emit()"
          class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          Today
        </button>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Bi-week</span>
        <button class="p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <span class="material-icons text-gray-400">expand_more</span>
        </button>
      </div>
    </div>
  `
})
export class CalendarHeaderComponent {
  @Input() currentDate!: Date;
  @Output() onPreviousWeek = new EventEmitter<void>();
  @Output() onNextWeek = new EventEmitter<void>();
  @Output() onToday = new EventEmitter<void>();
}
