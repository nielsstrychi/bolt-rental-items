import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3 text-sm text-gray-500 py-4">
      <span class="min-w-[90px]">{{startDate | date:'d MMM, h:mma'}}</span>
      <div class="flex-1 relative h-1.5">
        <div class="absolute inset-y-0 left-0 right-0 rounded-full" [class]="getBaseClass()"></div>
        <div [class]="getProgressClass()" [style.width]="getProgressWidth()" class="absolute inset-y-0 left-0 rounded-full"></div>
      </div>
      <span class="min-w-[90px]">{{endDate | date:'d MMM, h:mma'}}</span>
    </div>
  `
})
export class OrderTimelineComponent {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() status!: string;

  getBaseClass(): string {
    return this.status === 'Over Time' ? 'bg-red-100' : 'bg-gray-200';
  }

  getProgressClass(): string {
    const statusClasses: Record<string, string> = {
      'Over Time': 'bg-red-500',
      'Active': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Upcoming': 'bg-orange-500',
      'Draft': 'bg-gray-400'
    };
    return statusClasses[this.status] || 'bg-gray-400';
  }

  getProgressWidth(): string {
    const now = new Date().getTime();
    const start = this.startDate.getTime();
    const end = this.endDate.getTime();
    const total = end - start;
    
    if (this.status === 'Over Time') {
      return '100%';
    }
    
    if (this.status === 'Draft' || this.status === 'Upcoming') {
      return '0%';
    }
    
    if (this.status === 'Completed') {
      return '100%';
    }
    
    const current = now - start;
    const percentage = (current / total) * 100;
    return `${Math.min(100, Math.max(0, percentage))}%`;
  }
}
