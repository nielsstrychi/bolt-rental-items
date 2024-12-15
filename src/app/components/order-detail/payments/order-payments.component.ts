import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-payments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-sm font-medium text-gray-500">STATUS</h3>
        <span class="px-2.5 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
          Partially paid
        </span>
      </div>

      <div class="space-y-4 mb-6">
        <!-- Invoice -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons text-gray-400 text-[18px]">receipt</span>
            <h4 class="text-sm font-medium">Invoice</h4>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="text-sm text-gray-600">INV-{{order.id}}</span>
            <span class="font-medium">$600.00</span>
          </div>
        </div>

        <!-- Payment Receive -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons text-gray-400 text-[18px]">payments</span>
            <h4 class="text-sm font-medium">Payment Receive</h4>
            <span class="text-gray-400 text-sm">1</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <div class="text-sm">{{formatDate(order.startDate)}}</div>
              <div class="text-xs text-gray-500">Bank transfer</div>
            </div>
            <span class="text-green-600 font-medium">+$200.00</span>
          </div>
        </div>

        <!-- Payment Summary -->
        <div class="pt-4 border-t border-gray-200">
          <div class="flex justify-between mb-2">
            <span class="text-sm text-gray-600">Paid</span>
            <span class="font-medium">$200.00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Outstanding</span>
            <span class="font-medium">$400.00</span>
          </div>
        </div>
      </div>

      <button class="w-full bg-[#66BB6A] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
        Record Payment
        <span class="material-icons text-[18px]">expand_more</span>
      </button>
    </div>
  `
})
export class OrderPaymentsComponent {
  @Input() order!: Order;

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}
