import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';
import { calculateOvertime, formatOvertime } from '../utils/time.utils';

@Component({
  selector: 'app-order-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80"
      [class.hidden]="!isVisible"
      [style.top]="'100%'"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
      [style.marginTop]="'8px'">
      <!-- Arrow -->
      <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-l border-t border-gray-200"></div>
      
      <!-- Content -->
      <div class="relative">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="material-icons text-[18px]" [class]="getIconClass()">
              {{getStatusIcon()}}
            </span>
            <span class="font-medium">Order #{{order.id}}</span>
          </div>
          <div [class]="getStatusClass()">
            {{order.status}}
            @if (order.status === 'Over Time') {
              <span class="ml-1">+{{formatOvertime(getOvertimeHours())}}</span>
            }
          </div>
        </div>

        <!-- Customer Info -->
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
              {{order.customer.avatar}}
            </div>
            <div>
              <div class="text-sm font-medium">{{order.customer.name}}</div>
              <div class="text-xs text-gray-500">Via {{order.customer.channel}}</div>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div class="mb-4">
          <div class="text-xs font-medium text-gray-500 mb-1">ITEMS</div>
          <div class="space-y-1">
            @for (item of order.items; track item) {
              <div class="text-sm">{{item}}</div>
            }
          </div>
        </div>

        <!-- Timeline -->
        <div class="mb-4">
          <div class="text-xs font-medium text-gray-500 mb-1">TIMELINE</div>
          <div class="flex items-center gap-2 text-sm">
            <span class="material-icons text-gray-400 text-[18px]">schedule</span>
            <div>
              <div>{{formatDateTime(order.startDate)}}</div>
              <div>{{formatDateTime(order.endDate)}}</div>
              @if (order.status === 'Over Time') {
                <div class="text-red-600 mt-1">
                  Over {{formatOvertime(getOvertimeHours())}}
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end pt-3 border-t border-gray-100">
          <button 
            (click)="viewDetails()"
            class="px-3 py-1.5 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-1.5">
            <span>View Details</span>
            <span class="material-icons text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class OrderTooltipComponent {
  @Input() order!: Order;
  @Input() isVisible: boolean = false;
  @Output() onViewDetails = new EventEmitter<void>();

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

  getStatusClass(): string {
    const baseClasses = 'text-xs font-medium px-2 py-1 rounded-full inline-flex items-center ';
    const statusClasses: Record<string, string> = {
      'Over Time': 'bg-red-100 text-red-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Upcoming': 'bg-orange-100 text-orange-700',
      'Draft': 'bg-gray-100 text-gray-700',
      'Completed': 'bg-green-100 text-green-700'
    };
    return baseClasses + statusClasses[this.order.status];
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

  formatDateTime(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  formatOvertime = formatOvertime;

  viewDetails(): void {
    this.onViewDetails.emit();
  }
}
