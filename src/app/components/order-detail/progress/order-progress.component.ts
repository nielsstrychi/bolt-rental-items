import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { calculateOvertime, formatOvertime } from '../../calendar-view/utils/time.utils';

@Component({
  selector: 'app-order-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200 relative overflow-hidden">
      <!-- Left Border Accent -->
      <div class="absolute left-0 top-0 bottom-0 w-1" [class]="getAccentColor()"></div>

      <!-- Background Status Color -->
      <div class="absolute inset-0 opacity-5" [class]="getBackgroundColor()"></div>

      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-medium text-gray-500">RENT PROGRESS</h3>
        @if (status === 'Over Time') {
          <span class="text-sm text-red-600 font-medium">
            Over {{formatOvertime(getOvertimeHours())}}
          </span>
        }
      </div>
      
      <!-- Progress Bar Container -->
      <div class="relative mb-4">
        <!-- Progress Bar Background -->
        <div class="absolute h-[2px] bg-gray-200 left-0 right-0 top-[11px]"></div>
        
        <!-- Progress Bar Fill -->
        <div 
          class="absolute h-[2px] left-0 top-[11px] transition-all duration-500"
          [style.width]="progressWidth"
          [class]="getProgressBarColor()">
        </div>

        <!-- Overtime Extension -->
        @if (status === 'Over Time') {
          <div 
            class="absolute h-[2px] top-[11px] bg-red-200"
            [style.left]="'100%'"
            [style.width]="overtimeWidth">
          </div>
        }
        
        <!-- Timeline Points -->
        <div class="relative flex justify-between">
          <!-- Pickup Point -->
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2 mb-2">
              <div 
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                [class]="getPickupPointClass()">
                @if (isCompleted()) {
                  <span class="material-icons text-[14px] text-green-500">check</span>
                } @else {
                  <div class="w-2 h-2 rounded-full" [class]="getPickupDotClass()"></div>
                }
              </div>
            </div>
            <div class="text-sm font-medium">Picked up</div>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="material-icons text-gray-400 text-base">calendar_today</span>
              <span class="text-sm text-gray-500">{{formatDate(startDate)}}</span>
            </div>
          </div>

          <!-- Return Point -->
          <div class="flex flex-col items-end">
            <div class="flex items-center gap-2 mb-2">
              <div 
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                [class]="getReturnPointClass()">
                @if (isCompleted()) {
                  <span class="material-icons text-[14px] text-green-500">check</span>
                } @else {
                  <div class="w-2 h-2 rounded-full" [class]="getReturnDotClass()"></div>
                }
              </div>
            </div>
            <div class="text-sm font-medium">Return</div>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="material-icons text-gray-400 text-base">calendar_today</span>
              <span class="text-sm text-gray-500">{{formatDate(endDate)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderProgressComponent implements OnInit {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() status!: string;

  progressWidth = '0%';
  overtimeWidth = '0%';

  ngOnInit() {
    this.calculateProgress();
  }

  calculateProgress(): void {
    const now = new Date().getTime();
    const start = new Date(this.startDate).getTime();
    const end = new Date(this.endDate).getTime();
    const total = end - start;
    const current = now - start;
    
    let progress = (current / total) * 100;
    
    if (this.status === 'Completed') {
      progress = 100;
    } else if (this.status === 'Draft' || this.status === 'Upcoming') {
      progress = 0;
    } else if (this.status === 'Over Time') {
      progress = 100;
      // Calculate overtime width
      const overtime = now - end;
      this.overtimeWidth = `${(overtime / total) * 100}%`;
    } else {
      progress = Math.min(100, Math.max(0, progress));
    }
    
    this.progressWidth = `${progress}%`;
  }

  getOvertimeHours(): number {
    return calculateOvertime(this.endDate);
  }

  formatOvertime = formatOvertime;

  isCompleted(): boolean {
    return this.status === 'Completed';
  }

  getAccentColor(): string {
    const colors: Record<string, string> = {
      'Over Time': 'bg-red-500',
      'Active': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Draft': 'bg-gray-400',
      'Upcoming': 'bg-orange-500'
    };
    return colors[this.status] || 'bg-gray-400';
  }

  getBackgroundColor(): string {
    const colors: Record<string, string> = {
      'Over Time': 'bg-red-500',
      'Active': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Draft': 'bg-gray-400',
      'Upcoming': 'bg-orange-500'
    };
    return colors[this.status] || 'bg-gray-400';
  }

  getProgressBarColor(): string {
    const colors: Record<string, string> = {
      'Over Time': 'bg-red-500',
      'Active': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Draft': 'bg-gray-400',
      'Upcoming': 'bg-orange-500'
    };
    return colors[this.status] || 'bg-gray-400';
  }

  getPickupPointClass(): string {
    if (this.isCompleted()) {
      return 'border-green-500';
    }
    
    const colors: Record<string, string> = {
      'Over Time': 'border-red-500',
      'Active': 'border-blue-500',
      'Completed': 'border-green-500',
      'Draft': 'border-gray-300',
      'Upcoming': 'border-gray-300'
    };
    return colors[this.status] || 'border-gray-300';
  }

  getPickupDotClass(): string {
    const colors: Record<string, string> = {
      'Over Time': 'bg-red-500',
      'Active': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Draft': 'bg-gray-300',
      'Upcoming': 'bg-gray-300'
    };
    return colors[this.status] || 'bg-gray-300';
  }

  getReturnPointClass(): string {
    if (this.isCompleted()) {
      return 'border-green-500';
    }
    return 'border-gray-300';
  }

  getReturnDotClass(): string {
    if (this.isCompleted()) {
      return 'bg-green-500';
    }
    return 'bg-gray-300';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
