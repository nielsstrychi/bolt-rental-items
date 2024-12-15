import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDaysBetween } from '../utils/time.utils';

@Component({
  selector: 'app-timeline-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border-b border-gray-200 pb-2">
      <!-- Months -->
      <div class="flex h-6">
        @for (month of months; track month.name) {
          <div 
            class="text-xs font-medium text-gray-900 uppercase"
            [style.width.%]="month.width">
            {{month.name}}
          </div>
        }
      </div>

      <!-- Days -->
      <div class="flex pt-2">
        @for (day of days; track day) {
          <div class="flex-1 text-center">
            <div class="text-[11px] text-gray-400 font-medium">
              {{formatDayLetter(day)}}
            </div>
            <div class="text-xs text-gray-600">
              {{formatDate(day)}}
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TimelineHeaderComponent {
  @Input() startDate!: Date;
  @Input() endDate!: Date;

  get days(): Date[] {
    return getDaysBetween(this.startDate, this.endDate);
  }

  get months(): { name: string; width: number }[] {
    const months: { name: string; width: number }[] = [];
    const days = this.days;
    
    let currentMonth = '';
    let monthStart = 0;
    
    days.forEach((day, index) => {
      const monthName = day.toLocaleString('en-US', { month: 'long' });
      
      if (monthName !== currentMonth) {
        if (currentMonth !== '') {
          months.push({
            name: currentMonth,
            width: ((index - monthStart) / days.length) * 100
          });
        }
        currentMonth = monthName;
        monthStart = index;
      }
      
      if (index === days.length - 1) {
        months.push({
          name: currentMonth,
          width: ((index - monthStart + 1) / days.length) * 100
        });
      }
    });
    
    return months;
  }

  formatDayLetter(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' })[0];
  }

  formatDate(date: Date): string {
    return date.getDate().toString();
  }
}
