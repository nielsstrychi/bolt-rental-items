import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { CalendarOrderComponent } from './calendar-order.component';
import { TimelineHeaderComponent } from './header/timeline-header.component';
import { getTimePercentage } from './utils/time.utils';

@Component({
  selector: 'app-calendar-timeline',
  standalone: true,
  imports: [CommonModule, CalendarOrderComponent, TimelineHeaderComponent],
  template: `
    <div class="relative bg-white">
      <!-- Timeline Header -->
      <app-timeline-header
        [startDate]="startDate"
        [endDate]="endDate">
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
          @for (position of gridPositions; track position) {
            <div 
              class="absolute top-0 bottom-0 w-px bg-gray-100"
              [style.left.%]="position">
            </div>
          }
        </div>

        <!-- Orders -->
        <div class="relative">
          @for (row of orderRows; track row.index) {
            <div class="relative h-10">
              @for (order of row.orders; track order.id) {
                <app-calendar-order
                  [order]="order"
                  [style.left]="getOrderPosition(order)"
                  [style.width]="getOrderWidth(order)">
                </app-calendar-order>
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
export class CalendarTimelineComponent {
  @Input() orders: Order[] = [];
  @Input() startDate = new Date(2024, 11, 1); // Dec 1, 2024
  @Input() endDate = new Date(2024, 11, 14);   // Dec 14, 2024
  @Input() currentDate = new Date(2024, 11, 8); // Dec 8, 2024

  get gridPositions(): number[] {
    return Array.from({ length: 15 }, (_, i) => (i / 14) * 100);
  }

  get orderRows(): { index: number; orders: Order[] }[] {
    const rows: { index: number; orders: Order[] }[] = [];
    const sortedOrders = [...this.orders].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    for (const order of sortedOrders) {
      let placed = false;
      let rowIndex = 0;

      while (!placed) {
        const currentRow = rows.find(r => r.index === rowIndex);
        
        if (!currentRow) {
          rows.push({ index: rowIndex, orders: [order] });
          placed = true;
          continue;
        }

        const canPlace = !currentRow.orders.some(existingOrder => 
          this.ordersOverlap(order, existingOrder)
        );

        if (canPlace) {
          currentRow.orders.push(order);
          placed = true;
        } else {
          rowIndex++;
        }
      }
    }

    return rows;
  }

  private ordersOverlap(a: Order, b: Order): boolean {
    const aStart = new Date(a.startDate).getTime();
    const aEnd = new Date(a.endDate).getTime();
    const bStart = new Date(b.startDate).getTime();
    const bEnd = new Date(b.endDate).getTime();

    return !(aEnd <= bStart || aStart >= bEnd);
  }

  getCurrentTimePosition(): string {
    return `${getTimePercentage(this.currentDate, this.startDate, this.endDate)}%`;
  }

  getOrderPosition(order: Order): string {
    return `${getTimePercentage(order.startDate, this.startDate, this.endDate)}%`;
  }

  getOrderWidth(order: Order): string {
    const start = getTimePercentage(order.startDate, this.startDate, this.endDate);
    const end = getTimePercentage(order.endDate, this.startDate, this.endDate);
    return `${Math.max(0, Math.min(100, end - start))}%`;
  }
}
