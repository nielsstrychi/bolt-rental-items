import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1 font-medium">
      {{count}}
    </span>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
    }
  `]
})
export class NotificationBadgeComponent {
  @Input() count: string = '0';
}
