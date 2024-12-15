import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center">
      <div class="text-[11px] text-gray-400 font-medium">{{dayLetter}}</div>
      <div class="text-xs text-gray-600">{{date}}</div>
    </div>
  `
})
export class CalendarDayComponent {
  @Input() dayLetter!: string;
  @Input() date!: string;
}
