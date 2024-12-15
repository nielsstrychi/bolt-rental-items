import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';
import { TimelineHeaderComponent } from './timeline-header.component';
import { TimelineOrderComponent } from './timeline-order.component';
import { calculateTimelineRows, calculateOrderPosition, getDaysBetween, getTimePercentage } from '../utils/time.utils';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineHeaderComponent, TimelineOrderComponent],
  template: `
    <div class="relative">
      <!-- Timeline Header -->
      <app-timeline-header
        [startDate]="startDate"
        [endDate]="endDate"
        [currentDate]="currentDate">
      </app-timeline-header>

      <!-- Timeline Content -->
      <div class="relative mt-4">
        <!-- Current Time Indicator -->
        <div 
          class="absolute top-0 bottom-0 w-0.5 bg-purple-400 z-10" 
          [style.left]="getCurrentTimePosition()">
          <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>

        <!-- Grid Lines -->
        <div class="absolute inset-0">
          <!-- Day Background Highlights -->
          @for (day of days; track day) {
            <div 
              class="absolute top-0 bottom-0"
              [class.bg-purple-50]="isCurrentDay(day)"
              [style.left]="getDayPosition(day)"
              [style.width]="getDayWidth()">
              
              <!-- Hour Grid Lines -->
              @for (hour of hourPositions; track hour) {
                <div 
                  class="absolute top-0 bottom-0 w-px"
                  [class.bg-gray-100]="hour % 6 === 0"
                  [class.bg-gray-50]="hour % 6 !== 0"
                  [style.left]="(hour * (100/24)) + '%'">
                </div>
              }
            </div>
          }
          
          <!-- Vertical Day Separators -->
          @for (day of days; track day) {
            <div 
              class="absolute top-0 bottom-0 w-px border-l"
              [class.border-purple-200]="isCurrentDay(day)"
              [class.border-gray-200]="!isCurrentDay(day)"
              [style.left]="getDayPosition(day)">
            </div>
          }
        </div>

        <!-- Orders -->
        <div class="relative">
          @for (row of orderRows; track row.index) {
            <div class="relative h-10">
              @for (order of row.orders; track order.id) {
                <app-timeline-order
                  [order]="order"
                  [style.left]="getOrderPosition(order)"
                  [style.width]="getOrderWidth(order)">
                </app-timeline-order>
              }
            </div>
          }
        </div>

        <!-- Add Order Button -->
        <div class="relative mt-6 pt-4 border-t border-dashed border-gray-200">
          <button 
            class="group w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex items-center gap-2">
              <span class="material-icons text-[18px]">add</span>
              <span>Add Order</span>
            </div>
            <span class="material-icons text-[18px] text-gray-400 ml-1">move_down</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class TimelineComponent {
  @Input() orders: Order[] = [];
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() currentDate!: Date;

  get days(): Date[] {
    return getDaysBetween(this.startDate, this.endDate);
  }

  get orderRows() {
    return calculateTimelineRows(this.orders);
  }

  get hourPositions(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }

  isCurrentDay(date: Date): boolean {
    return date.toDateString() === this.currentDate.toDateString();
  }

  getCurrentTimePosition(): string {
    return `${getTimePercentage(this.currentDate, this.startDate, this.endDate)}%`;
  }

  getDayPosition(day: Date): string {
    return `${getTimePercentage(day, this.startDate, this.endDate)}%`;
  }

  getDayWidth(): string {
    return `${100 / this.days.length}%`;
  }

  getOrderPosition(order: Order): string {
    const position = calculateOrderPosition(order, this.startDate, this.endDate);
    return position.left;
  }

  getOrderWidth(order: Order): string {
    const position = calculateOrderPosition(order, this.startDate, this.endDate);
    return position.width;
  }
}
