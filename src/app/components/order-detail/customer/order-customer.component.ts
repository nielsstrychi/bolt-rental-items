import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-customer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
            {{customer.avatar}}
          </div>
          <div>
            <h3 class="text-lg font-medium">{{customer.name}}</h3>
            <p class="text-sm text-gray-500">Via {{customer.channel}}</p>
          </div>
        </div>
        <button class="text-sm text-gray-600 hover:text-gray-900">
          Change Customer
        </button>
      </div>

      <div class="flex gap-4">
        <button class="btn-secondary">
          <span class="material-icons">attach_file</span>
          (4) Attachments
        </button>
        <button class="btn-secondary">
          <span class="material-icons">mail</span>
          Send Email
        </button>
        <button class="btn-secondary">
          <span class="material-icons">phone</span>
          +1 555-0123
        </button>
      </div>
    </div>
  `,
  styles: [`
    .btn-secondary {
      @apply border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2;
    }
  `]
})
export class OrderCustomerComponent {
  @Input() customer!: { name: string; avatar: string; channel: string; };
}
