import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-8 border-t border-gray-200">
      <!-- Time labels -->
      <div class="border-r border-gray-200 py-2">
        @for (hour of hours; track hour) {
          <div class="h-12 text-xs text-gray-500 text-right pr-2">
            {{formatHour(hour)}}
          </div>
        }
      </div>

      <!-- Days -->
      @for (day of days; track day.date) {
        <div class="border-r border-gray-200">
          <div class="h-6 px-2 py-1 text-sm font-medium border-b border-gray-200 flex justify-between items-center">
            <span>{{formatDate(day.date)}}</span>
            @if (isToday(day.date)) {
              <span class="text-xs text-blue-600 font-normal">Today</span>
            }
          </div>
          <!-- Time slots -->
          @for (hour of hours; track hour) {
            <div class="h-12 border-b border-gray-100 relative">
              @if (isCurrentTime(day.date, hour)) {
                <div class="absolute inset-0 bg-purple-100/20"></div>
                <div class="absolute left-0 right-0 top-0 h-0.5 bg-purple-400"></div>
              }
            </div>
          }
        </div>
      }
    </div>
  `
})
export class CalendarGridComponent {
  @Input() days: { date: Date }[] = [];
  @Input() hours = Array.from({ length: 24 }, (_, i) => i);

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'short'
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isCurrentTime(date: Date, hour: number): boolean {
    const now = new Date();
    return this.isToday(date) && now.getHours() === hour;
  }
}
