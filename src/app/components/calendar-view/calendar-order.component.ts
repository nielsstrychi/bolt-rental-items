import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { formatTime, calculateOvertime } from './utils/time.utils';
import { OrderTooltipComponent } from './order-tooltip/order-tooltip.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-order',
  standalone: true,
  imports: [CommonModule, OrderTooltipComponent],
  template: `
    <div class="relative">
      <!-- Base Order Bar -->
      <div 
        [class]="getContainerClass()" 
        class="h-8 relative cursor-pointer group"
        (click)="toggleTooltip()"
        (mouseleave)="hideTooltipIfNotClicked()">
        <div class="flex items-center h-full px-2 gap-1.5 overflow-hidden">
          <!-- Status Icon -->
          <span class="material-icons text-[14px]" [class]="getIconClass()">{{getStatusIcon()}}</span>
          
          <!-- Order ID -->
          <span class="text-xs font-medium">#{{order.id}}</span>
          <span class="text-xs text-gray-400">|</span>
          
          <!-- Customer Name -->
          <span class="text-xs">{{order.customer.name}}</span>
          
          <!-- Time -->
          <span class="text-[10px] text-gray-500 ml-auto whitespace-nowrap">
            {{formatTime(order.endDate)}}
          </span>

          <!-- Overtime Display -->
          @if (order.status === 'Over Time') {
            <span class="text-[11px] text-red-600 ml-2 whitespace-nowrap">
              +{{getOvertimeHours()}}h
            </span>
          }
        </div>

        <!-- Overtime Extension -->
        @if (order.status === 'Over Time') {
          <div 
            class="absolute top-0 bottom-0 bg-red-200 opacity-50"
            [style.left]="'100%'"
            [style.width]="getOvertimeWidth()">
          </div>
        }

        <!-- Tooltip -->
        <app-order-tooltip
          [order]="order"
          [isVisible]="isTooltipVisible"
          (onViewDetails)="viewOrderDetails()">
        </app-order-tooltip>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      min-width: 200px;
      z-index: 1;
    }

    :host:hover {
      z-index: 10;
    }
  `]
})
export class CalendarOrderComponent {
  @Input() order!: Order;
  isTooltipVisible = false;
  wasClicked = false;

  constructor(private router: Router) {}

  getContainerClass(): string {
    const baseClasses = 'rounded-[4px] shadow-sm overflow-visible hover:shadow-md transition-shadow ';
    const statusClasses: Record<string, string> = {
      'Over Time': 'bg-red-50 border border-red-200',
      'Active': 'bg-blue-50 border border-blue-200',
      'Upcoming': 'bg-orange-50 border border-orange-200',
      'Draft': 'bg-gray-50 border border-gray-200',
      'Completed': 'bg-white border border-gray-200'
    };
    return baseClasses + statusClasses[this.order.status];
  }

  getIconClass(): string {
    const statusClasses: Record<string, string> = {
      'Over Time': 'text-red-600',
      'Active': 'text-blue-500',
      'Upcoming': 'text-orange-500',
      'Draft': 'text-gray-400',
      'Completed': 'text-green-500'
    };
    return statusClasses[this.order.status];
  }

  getStatusIcon(): string {
    const icons: Record<string, string> = {
      'Over Time': 'warning',
      'Active': 'bolt',
      'Upcoming': 'schedule',
      'Draft': 'edit',
      'Completed': 'check_circle'
    };
    return icons[this.order.status];
  }

  getOvertimeHours(): number {
    return calculateOvertime(this.order.endDate);
  }

  getOvertimeWidth(): string {
    const now = new Date();
    const end = new Date(this.order.endDate);
    if (now > end) {
      const totalDuration = end.getTime() - new Date(this.order.startDate).getTime();
      const overtime = now.getTime() - end.getTime();
      return `${(overtime / totalDuration) * 100}%`;
    }
    return '0%';
  }

  toggleTooltip(): void {
    this.wasClicked = !this.wasClicked;
    this.isTooltipVisible = this.wasClicked;
  }

  hideTooltip(): void {
    this.wasClicked = false;
    this.isTooltipVisible = false;
  }

  hideTooltipIfNotClicked(): void {
    if (this.wasClicked) {
      this.wasClicked = false;
      this.isTooltipVisible = false;
    }
  }

  viewOrderDetails(): void {
    this.router.navigate(['/orders', this.order.id]);
  }

  formatTime = formatTime;
}
