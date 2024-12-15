import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="border border-gray-300 px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      <span class="material-icons text-[18px]">download</span>
      Export
    </button>
  `
})
export class ExportButtonComponent {}
