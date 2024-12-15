import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { CalendarOrderComponent } from './calendar-order.component';
import { calculateOrderPosition, calculateTimePosition } from './utils/time.utils';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, CalendarOrderComponent],
  template: `
    <div class="bg-white rounded-lg p-4">
      <!-- Navigation Controls -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <button 
            (click)="navigateWeek(-1)"
            class="p-1 hover:bg-gray-50 rounded-lg transition-colors">
            <span class="material-icons text-gray-400">chevron_left</span>
          </button>
          <button 
            (click)="navigateWeek(1)"
            class="p-1 hover:bg-gray-50 rounded-lg transition-colors">
            <span class="material-icons text-gray-400">chevron_right</span>
          </button>
          <button 
            (click)="goToToday()"
            class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            Today
          </button>
        </div>
      </div>

      <!-- Horizontal Date Header -->
      <div class="flex border-b border-gray-200 mb-6">
        <!-- Month and Date Column Headers -->
        <div class="flex-1">
          <div class="flex">
            @for (month of getMonths(); track month.name) {
              <div 
                class="text-xs font-medium text-gray-900 uppercase"
                [style.width]="month.width + '%'">
                {{month.name}}
              </div>
            }
          </div>
          <div class="flex mt-2">
            @for (date of dateRange; track date) {
              <div 
                class="flex-1 text-center pb-4"
                [class.bg-purple-50]="isToday(date)"
                [class.border-purple-200]="isToday(date)"
                [class.border-l]="!isFirst(date)">
                <div class="text-[11px] text-gray-400 font-medium">
                  {{formatDayLetter(date)}}
                </div>
                <div 
                  class="text-xs"
                  [class.text-purple-600]="isToday(date)"
                  [class.font-medium]="isToday(date)">
                  {{formatDate(date)}}
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Timeline Content -->
      <div class="relative">
        <!-- Current time indicator -->
        <div 
          class="absolute top-[-24px] bottom-[60px] w-0.5 bg-purple-400 z-20"
          [style.left]="getCurrentTimePosition()"
          [style.display]="isCurrentTimeVisible() ? 'block' : 'none'">
          <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>

        <!-- Grid lines -->
        <div class="absolute inset-0">
          @for (date of dateRange; track date) {
            <div 
              class="absolute top-0 bottom-0 border-l"
              [class.border-purple-200]="isToday(date)"
              [class.border-gray-100]="!isToday(date)"
              [style.left]="getDayPosition(date)">
            </div>
          }
        </div>

        <!-- Orders grouped by item -->
        @for (group of groupedOrders; track group.item) {
          <div class="">
            <div class="relative h-10">
              @for (order of group.orders; track order.id) {
                <app-calendar-order
                  [order]="order"
                  [style.left]="getOrderPosition(order).left"
                  [style.width]="getOrderPosition(order).width"
                  class="absolute top-0">
                </app-calendar-order>
              }
            </div>
          </div>
        }

        <!-- Add Order Section -->
        <div class="relative mt-6">
          <div class="absolute left-0 right-0 border-t border-dashed border-gray-200"></div>
          <div class="pt-4">
            <button class="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span class="material-icons text-[18px]">add</span>
              <span>Add Order</span>
              <span class="material-icons text-[18px] text-gray-400 ml-1">move_down</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarViewComponent implements OnInit, OnDestroy {
  @Input() orders: Order[] = [];
  
  currentTime: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  dateRange: Date[] = [];
  private timeInterval: any;
  private baseDate: Date = new Date(); // Reference date for navigation

  constructor() {
    this.updateDateRange();
  }

  ngOnInit() {
    // Update current time every minute
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  navigateWeek(direction: number) {
    this.baseDate = new Date(this.baseDate.getTime());
    this.baseDate.setDate(this.baseDate.getDate() + (direction * 7));
    this.updateDateRange();
  }

  goToToday() {
    this.baseDate = new Date();
    this.updateDateRange();
  }

  updateDateRange() {
    // Calculate start date (6 days before base date)
    this.startDate = new Date(this.baseDate);
    this.startDate.setDate(this.baseDate.getDate() - 6);
    this.startDate.setHours(0, 0, 0, 0);

    // Calculate end date (7 days after base date)
    this.endDate = new Date(this.baseDate);
    this.endDate.setDate(this.baseDate.getDate() + 7);
    this.endDate.setHours(23, 59, 59, 999);

    this.dateRange = this.generateDateRange();
  }

  isCurrentTimeVisible(): boolean {
    const now = this.currentTime.getTime();
    return now >= this.startDate.getTime() && now <= this.endDate.getTime();
  }

  get groupedOrders() {
    // Filter orders within the current date range
    const visibleOrders = this.orders.filter(order => {
      const orderStart = new Date(order.startDate).getTime();
      const orderEnd = new Date(order.endDate).getTime();
      return (orderStart <= this.endDate.getTime() && orderEnd >= this.startDate.getTime());
    });

    const groups = new Map<string, Order[]>();
    
    visibleOrders.forEach(order => {
      const mainItem = order.items[0];
      if (!groups.has(mainItem)) {
        groups.set(mainItem, []);
      }
      groups.get(mainItem)?.push(order);
    });

    return Array.from(groups.entries()).map(([item, orders]) => ({
      item,
      orders: orders.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    }));
  }

  generateDateRange(): Date[] {
    const dates: Date[] = [];
    const current = new Date(this.startDate);
    
    while (current <= this.endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  }

  getMonths() {
    const months = new Map<string, number>();
    const totalDays = this.dateRange.length;
    
    this.dateRange.forEach(date => {
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      months.set(monthName, (months.get(monthName) || 0) + 1);
    });
    
    return Array.from(months.entries()).map(([name, days]) => ({
      name,
      width: (days / totalDays) * 100
    }));
  }

  formatDayLetter(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' })[0];
  }

  formatDate(date: Date): string {
    return date.getDate().toString();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isFirst(date: Date): boolean {
    return date.getTime() === this.dateRange[0].getTime();
  }

  getDayPosition(date: Date): string {
    return `${calculateTimePosition(date, this.startDate, this.endDate)}%`;
  }

  getOrderPosition(order: Order) {
    return calculateOrderPosition(order, this.startDate, this.endDate);
  }

  getCurrentTimePosition(): string {
    return `${calculateTimePosition(this.currentTime, this.startDate, this.endDate)}%`;
  }
}
