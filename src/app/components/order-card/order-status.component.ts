import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type StatusType = 'Draft' | 'Active' | 'Over Time' | 'Completed' | 'Upcoming';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getStatusClass()">
      <span class="material-icons text-[16px] leading-none">{{getStatusIcon()}}</span>
      {{status}}
    </span>
  `
})
export class OrderStatusComponent {
  @Input() status!: StatusType;

  getStatusClass(): string {
    const baseClasses = 'px-2.5 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ';
    const statusClasses: Record<StatusType, string> = {
      'Draft': 'bg-gray-100 text-gray-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Over Time': 'bg-red-100 text-red-700',
      'Completed': 'bg-green-100 text-green-700',
      'Upcoming': 'bg-orange-100 text-orange-700'
    };
    return baseClasses + statusClasses[this.status];
  }

  getStatusIcon(): string {
    const icons: Record<StatusType, string> = {
      'Draft': 'edit',
      'Active': 'bolt',
      'Over Time': 'warning',
      'Completed': 'check_circle',
      'Upcoming': 'schedule'
    };
    return icons[this.status];
  }
}
