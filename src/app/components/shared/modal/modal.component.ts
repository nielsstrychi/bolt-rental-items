import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto" *ngIf="isOpen">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity" (click)="close.emit()"></div>

      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-white rounded-lg shadow-xl transform transition-all">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">{{title}}</h3>
            <button 
              (click)="close.emit()"
              class="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <span class="material-icons text-gray-500">close</span>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
}
