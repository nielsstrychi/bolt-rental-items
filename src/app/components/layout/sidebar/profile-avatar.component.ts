import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group">
      <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-amber-50 transition-colors">
        {{initials}}
      </div>
      @if (tooltip) {
        <div class="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
          {{tooltip}}
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProfileAvatarComponent {
  @Input() initials: string = 'ST';
  @Input() tooltip?: string;
}
