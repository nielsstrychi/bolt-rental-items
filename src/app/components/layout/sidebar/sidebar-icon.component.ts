import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative group">
      <a [href]="link" 
         class="relative w-7 h-7 flex items-center justify-center hover:bg-gray-50 rounded-lg group transition-colors">
        <span class="material-icons text-[16px]" 
              [class.text-gray-400]="lighter"
              [class.text-gray-600]="!lighter">
          {{icon}}
        </span>
        <ng-content></ng-content>
      </a>
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
      position: relative;
    }
  `]
})
export class SidebarIconComponent {
  @Input() icon!: string;
  @Input() link: string = '#';
  @Input() tooltip?: string;
  @Input() lighter: boolean = false;
}
