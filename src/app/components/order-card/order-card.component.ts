import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderStatusComponent } from '../shared/order-status/order-status.component';
import { OrderTimelineComponent } from './order-timeline.component';
import { OrderAvatarComponent } from './order-avatar.component';
import { Order } from '../../models/order.model';
import { calculateOvertime, formatOvertime } from '../calendar-view/utils/time.utils';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule, OrderStatusComponent, OrderTimelineComponent, OrderAvatarComponent],
  template: `
    <div [class]="getCardClass()" (click)="navigateToDetail()">
      <!-- Header -->
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2">
          <span class="text-gray-500 font-medium">#{{order.id}}</span>
          <app-order-status [status]="order.status"></app-order-status>
          @if (order.status === 'Over Time') {
            <span class="text-xs text-red-600 font-medium">
              +{{formatOvertime(getOvertimeHours())}}
            </span>
          }
        </div>
      </div>

      <!-- Items -->
      <div class="mb-2 min-h-10">
        <p class="text-sm text-gray-800 line-clamp-2">{{order.items.join('; ')}}</p>
      </div>

      <!-- Timeline -->
      <app-order-timeline 
        [startDate]="order.startDate"
        [endDate]="order.endDate"
        [status]="order.status">
      </app-order-timeline>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-3">
          <app-order-avatar 
            [initials]="order.customer.avatar"
            [colorIndex]="order.customer.name.length">
          </app-order-avatar>
          <div>
            <div class="text-sm font-medium text-gray-900">{{order.customer.name}}</div>
            <div class="text-xs text-gray-500">Via {{order.customer.channel}}</div>
          </div>
        </div>
        <button class="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <span class="material-icons text-gray-400 text-[20px]">chevron_right</span>
        </button>
      </div>

      <!-- Bottom Border -->
      <div [class]="getBottomBorderClass()"></div>
    </div>
  `
})
export class OrderCardComponent {
  @Input() order!: Order;

  constructor(private router: Router) {}

  getCardClass(): string {
    const baseClasses = 'relative overflow-hidden p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ';
    const statusClasses: Record<string, string> = {
      'Draft': 'bg-gray-50 border border-gray-200',
      'Active': 'bg-white border border-gray-200',
      'Over Time': 'bg-red-50 border border-red-200',
      'Completed': 'bg-white border border-gray-200',
      'Upcoming': 'bg-white border border-gray-200'
    };
    return baseClasses + (statusClasses[this.order.status] || 'bg-white border border-gray-200');
  }

  getBottomBorderClass(): string {
    const baseClasses = 'absolute bottom-0 left-0 right-0 h-1 ';
    const statusColors: Record<string, string> = {
      'Draft': 'bg-gray-200',
      'Active': 'bg-blue-500',
      'Over Time': 'bg-red-500',
      'Completed': 'bg-green-500',
      'Upcoming': 'bg-orange-500'
    };
    return baseClasses + (statusColors[this.order.status] || 'bg-gray-200');
  }

  getOvertimeHours(): number {
    return calculateOvertime(this.order.endDate);
  }

  formatOvertime = formatOvertime;

  navigateToDetail(): void {
    this.router.navigate(['/orders', this.order.id]);
  }
}
