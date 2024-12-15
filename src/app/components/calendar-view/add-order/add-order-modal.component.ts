import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-add-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalComponent],
  template: `
    <app-modal [isOpen]="isOpen" title="Add New Order" (close)="onClose()">
      <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">
        <!-- Customer Information -->
        <div class="space-y-4 mb-6">
          <h4 class="text-sm font-medium text-gray-900">Customer Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input 
                type="text" 
                formControlName="customerName"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
                placeholder="Enter customer name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Channel</label>
              <select 
                formControlName="channel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20">
                <option value="Website">Website</option>
                <option value="In-store">In-store</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Order Details -->
        <div class="space-y-4 mb-6">
          <h4 class="text-sm font-medium text-gray-900">Order Details</h4>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Items</label>
            <input 
              type="text" 
              formControlName="items"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
              placeholder="Enter items (comma separated)">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="datetime-local" 
                formControlName="startDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="datetime-local" 
                formControlName="endDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20">
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button 
            type="button"
            (click)="onClose()"
            class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            type="submit"
            [disabled]="!orderForm.valid"
            class="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Add Order
          </button>
        </div>
      </form>
    </app-modal>
  `
})
export class AddOrderModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() addOrder = new EventEmitter<Partial<Order>>();

  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      channel: ['Website', Validators.required],
      items: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onClose() {
    this.orderForm.reset({
      channel: 'Website'
    });
    this.close.emit();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const newOrder: Partial<Order> = {
        status: 'Draft',
        items: formValue.items.split(',').map((item: string) => item.trim()),
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        customer: {
          name: formValue.customerName,
          avatar: formValue.customerName.split(' ').map((n: string) => n[0]).join(''),
          channel: formValue.channel
        }
      };
      this.addOrder.emit(newOrder);
      this.onClose();
    }
  }
}
