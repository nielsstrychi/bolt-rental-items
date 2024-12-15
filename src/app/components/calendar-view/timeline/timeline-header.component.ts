import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border-b border-gray-200">
      <!-- Months -->
      <div class="flex items-end h-6">
        @for (month of months; track month.name) {
          <div 
            class="text-xs font-medium text-gray-900 uppercase"
            [style.width.%]="month.width">
            {{month.name}}
          </div>
        }
      </div>

      <!-- Days -->
      <div class="flex pt-2 pb-3">
        @for (day of days; track day.date) {
          <div 
            class="flex-1 text-center border-l border-gray-200 first:border-l-0"
            [class.bg-purple-50]="isCurrentDay(day.date)">
            <div class="text-[11px] text-gray-400 font-medium">
              {{formatDayLetter(day.date)}}
            </div>
            <div 
              class="text-xs"
              [class.text-purple-600]="isCurrentDay(day.date)"
              [class.font-medium]="isCurrentDay(day.date)"
              [class.text-gray-600]="!isCurrentDay(day.date)">
              {{formatDate(day.date)}}
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
  @Input() currentDate!: Date;

  get days(): { date: Date }[] {
    const days: { date: Date }[] = [];
    const current = new Date(this.startDate);
    
    while (current <= this.endDate) {
      days.push({ date: new Date(current) });
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }

  get months(): { name: string; width: number }[] {
    const months: { name: string; width: number }[] = [];
    const days = this.days;
    
    let currentMonth = '';
    let monthStart = 0;
    
    days.forEach((day, index) => {
      const monthName = day.date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
      
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

  isCurrentDay(date: Date): boolean {
    return date.toDateString() === this.currentDate.toDateString();
  }

  formatDayLetter(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' })[0];
  }

  formatDate(date: Date): string {
    return date.getDate().toString();
  }
}
