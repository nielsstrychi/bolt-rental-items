import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute inset-0">
      @for (position of gridPositions; track position) {
        <div 
          class="absolute top-0 bottom-0 w-px bg-gray-100"
          [style.left.%]="position">
        </div>
      }
    </div>
  `
})
export class TimelineGridComponent {
  @Input() days = 14;

  get gridPositions(): number[] {
    return Array.from({ length: this.days + 1 }, (_, i) => (i / this.days) * 100);
  }
}
