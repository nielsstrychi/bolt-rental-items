import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-brand',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="position: absolute; white-space: nowrap; font-size: 0.875rem; font-weight: bold; color: #000000; letter-spacing: 0.1em; text-transform: lowercase; writing-mode: vertical-lr;">
  rentabel
</div>


  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      height: 80px;
    }
  `]
})
export class SidebarBrandComponent {}
