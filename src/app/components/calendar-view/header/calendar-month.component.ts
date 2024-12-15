import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-month',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-xs font-medium text-gray-900 uppercase">{{month}}</div>
  `
})
export class CalendarMonthComponent {
  @Input() month!: string;
}
