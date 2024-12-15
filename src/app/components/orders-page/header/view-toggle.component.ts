import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <button 
        [class]="getButtonClass('card')"
        (click)="onViewChange.emit('card')">
        Card view
      </button>
      <button 
        [class]="getButtonClass('calendar')"
        (click)="onViewChange.emit('calendar')">
        Calendar
      </button>
    </div>
  `
})
export class ViewToggleComponent {
  @Input() currentView: 'card' | 'calendar' = 'card';
  @Output() onViewChange = new EventEmitter<'card' | 'calendar'>();

  getButtonClass(view: 'card' | 'calendar'): string {
    const baseClasses = 'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ';
    return baseClasses + (view === this.currentView 
      ? 'bg-black text-white' 
      : 'text-gray-500 hover:bg-gray-50');
  }
}
