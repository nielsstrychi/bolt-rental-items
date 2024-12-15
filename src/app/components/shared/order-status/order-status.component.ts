import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type StatusType = 'Draft' | 'Active' | 'Over Time' | 'Completed' | 'Upcoming';
type SizeType = 'sm' | 'md';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getStatusClass()">
      <span class="material-icons" [style.font-size]="size === 'sm' ? '14px' : '16px'">{{getStatusIcon()}}</span>
      {{status}}
    </span>
  `
})
export class OrderStatusComponent {
  @Input() status!: string;
  @Input() size: SizeType = 'md';

  getStatusClass(): string {
    const baseClasses = 'rounded-full text-xs font-medium inline-flex items-center gap-1.5 ';
    const sizeClasses = this.size === 'sm' ? 'px-2 py-1' : 'px-2.5 py-1.5';
    
    /*const statusClasses: Record<StatusType, string> = {
      'Draft': 'bg-gray-100 text-gray-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Over Time': 'bg-red-100 text-red-700',
      'Completed': 'bg-green-100 text-green-700',
      'Upcoming': 'bg-orange-100 text-orange-700'
    };*/
    
    return baseClasses + sizeClasses + ' ' + /*statusClasses[this.status]*/this.status;
  }

  getStatusIcon(): string {
    /*const icons: Record<StatusType, string> = {
      'Draft': 'edit',
      'Active': 'bolt',
      'Over Time': 'warning',
      'Completed': 'check_circle',
      'Upcoming': 'schedule'
    };
    return icons[this.status];*/
		return this.status
  }
}
