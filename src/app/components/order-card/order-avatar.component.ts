import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getAvatarClass()">
      {{initials}}
    </div>
  `
})
export class OrderAvatarComponent {
  @Input() initials!: string;
  @Input() colorIndex: number = 0;

  private colors = [
    'bg-emerald-100 text-emerald-700',
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700'
  ];

  getAvatarClass(): string {
    const colorClass = this.colors[this.colorIndex % this.colors.length];
    return `w-9 h-9 rounded-full ${colorClass} flex items-center justify-center text-sm font-medium`;
  }
}
