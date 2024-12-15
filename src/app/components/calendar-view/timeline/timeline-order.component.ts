import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';
import { formatTime, formatDuration } from '../utils/time.utils';

@Component({
  selector: 'app-timeline-order',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getContainerClass()" class="absolute my-1">
      <div class="flex items-center h-7 px-2 gap-1.5">
        @if (isShortDuration) {
          <!-- Compact view for short duration orders -->
          <div class="flex items-center">
            @if (order.status === 'Over Time') {
              <span class="material-icons text-[14px] text-red-600">warning</span>
            } @else if (order.status === 'Draft') {
              <span class="material-icons text-[14px] text-gray-400">edit</span>
            } @else {
              <span class="material-icons text-[14px] text-blue-500">bolt</span>
            }
            <span class="text-xs font-medium ml-1">#{{order.id}}</span>
          </div>
        } @else {
          <!-- Full view for normal duration orders -->
          @if (order.status === 'Over Time') {
            <span class="material-icons text-[14px] text-red-600">warning</span>
          } @else if (order.status === 'Draft') {
            <span class="material-icons text-[14px] text-gray-400">edit</span>
          } @else {
            <span class="material-icons text-[14px] text-blue-500">bolt</span>
          }
          
          <span class="text-xs font-medium">#{{order.id}}</span>
          <span class="text-xs text-gray-400">|</span>
          <span class="text-xs">{{order.customer.name}}</span>
          
          <span class="text-[10px] text-gray-500 ml-auto whitespace-nowrap">
            {{formatTime(order.startDate)}} - {{formatTime(order.endDate)}}
          </span>
          
          @if (order.status === 'Over Time') {
            <span class="text-[11px] text-red-600 ml-2">
              {{formatDuration(order.startDate, order.endDate)}}
            </span>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      min-width: 80px;
      z-index: 1;
    }
  `]
})
export class TimelineOrderComponent {
  @Input() order!: Order;

  get isShortDuration(): boolean {
    const duration = new Date(this.order.endDate).getTime() - new Date(this.order.startDate).getTime();
    const hoursDuration = duration / (1000 * 60 * 60);
    return hoursDuration <= 24;
  }

  getContainerClass(): string {
    const baseClasses = 'rounded-[4px] shadow-sm overflow-hidden ';
    const statusClasses: Record<string, string> = {
      'Over Time': 'bg-red-50 border border-red-200',
      'Active': 'bg-blue-50 border border-blue-200',
      'Upcoming': 'bg-orange-50 border border-orange-200',
      'Draft': 'bg-gray-50 border border-gray-200',
      'Completed': 'bg-white border border-gray-200'
    };
    return baseClasses + statusClasses[this.order.status];
  }

  formatTime = formatTime;
  formatDuration = formatDuration;
}
