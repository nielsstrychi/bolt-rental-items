import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order.model';
import { OrderStatusComponent } from '../../shared/order-status/order-status.component';
import { ExportService } from '../../../services/export.service';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-order-header',
  standalone: true,
  imports: [CommonModule, OrderStatusComponent],
  template: `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-semibold flex items-center gap-2">
          Order #{{order.id}}
          <span class="material-icons" [class]="getStatusIconClass()">{{getStatusIcon()}}</span>
          <span [class]="getStatusTextClass()">{{order.status}}</span>
        </h1>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="btn-secondary" (click)="onExport()">
          <span class="material-icons">download</span>
          Export
        </button>
        <button class="btn-secondary" (click)="onPrint()">
          <span class="material-icons">print</span>
          Print
        </button>
        <button class="btn-primary">
          Confirm Return
        </button>
        
        <!-- More Actions Menu -->
        <div class="relative">
          <button 
            class="btn-icon"
            (click)="toggleActionMenu()">
            <span class="material-icons">more_horiz</span>
          </button>

          <!-- Action Menu Dropdown -->
          @if (showActionMenu) {
            <div class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button class="menu-item" (click)="onAction('edit')">
                <span class="material-icons">edit</span>
                Edit Order
              </button>
              <button class="menu-item" (click)="onAction('duplicate')">
                <span class="material-icons">content_copy</span>
                Duplicate Order
              </button>
              <button class="menu-item" (click)="onAction('cancel')">
                <span class="material-icons">cancel</span>
                Cancel Order
              </button>
              <button class="menu-item text-red-600" (click)="onAction('delete')">
                <span class="material-icons">delete</span>
                Delete Order
              </button>

              <div class="border-t border-gray-100 my-2"></div>

              <!-- Status Management -->
              <button class="menu-item" (click)="onAction('mark-paid')">
                <span class="material-icons">payments</span>
                Mark as Paid
              </button>
              <button class="menu-item" (click)="onAction('change-status')">
                <span class="material-icons">swap_horiz</span>
                Change Status
              </button>
              <button class="menu-item" (click)="onAction('extend')">
                <span class="material-icons">update</span>
                Extend Rental Period
              </button>

              <div class="border-t border-gray-100 my-2"></div>

              <!-- Communication -->
              <button class="menu-item" (click)="onAction('send-invoice')">
                <span class="material-icons">receipt</span>
                Send Invoice
              </button>
              <button class="menu-item" (click)="onAction('contact')">
                <span class="material-icons">mail</span>
                Contact Customer
              </button>
              <button class="menu-item" (click)="onAction('share')">
                <span class="material-icons">share</span>
                Share Order Details
              </button>

              <div class="border-t border-gray-100 my-2"></div>

              <!-- Additional Actions -->
              <button class="menu-item" (click)="onAction('add-note')">
                <span class="material-icons">note_add</span>
                Add Note
              </button>
              <button class="menu-item" (click)="onAction('history')">
                <span class="material-icons">history</span>
                View Order History
              </button>
              <button class="menu-item" (click)="onAction('assign')">
                <span class="material-icons">person_add</span>
                Assign Staff Member
              </button>
              <button class="menu-item" (click)="onAction('refund')">
                <span class="material-icons">currency_exchange</span>
                Refund Payment
              </button>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-6 mt-6 border-b border-gray-200">
      <button 
        class="tab-button"
        [class.active]="activeTab === 'payments'"
        (click)="setActiveTab('payments')">
        Payments
      </button>
      <button 
        class="tab-button"
        [class.active]="activeTab === 'notes'"
        (click)="setActiveTab('notes')">
        Notes
      </button>
    </div>
  `,
  styles: [`
    .btn-primary {
      @apply bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors;
    }
    .btn-secondary {
      @apply border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2;
    }
    .btn-icon {
      @apply p-2 hover:bg-gray-50 rounded-lg transition-colors;
    }
    .tab-button {
      @apply px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent -mb-px transition-colors;
    }
    .tab-button.active {
      @apply text-gray-900 border-black;
    }
    .menu-item {
      @apply w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2 transition-colors;
    }
    .menu-item .material-icons {
      @apply text-[18px] text-gray-400;
    }
  `]
})
export class OrderHeaderComponent {
  @Input() order!: Order;
  @Input() activeTab: 'payments' | 'notes' = 'payments';
  @Output() activeTabChange = new EventEmitter<'payments' | 'notes'>();

  showActionMenu = false;

  constructor(
    private exportService: ExportService,
    private printService: PrintService
  ) {}

  onExport(): void {
    this.exportService.exportOrder(this.order);
  }

  onPrint(): void {
    this.printService.printOrder(this.order);
  }

  toggleActionMenu(): void {
    this.showActionMenu = !this.showActionMenu;
  }

  onAction(action: string): void {
    // Handle different actions
    switch (action) {
      case 'edit':
        // Implement edit logic
        break;
      case 'duplicate':
        // Implement duplicate logic
        break;
      case 'cancel':
        // Implement cancel logic
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this order?')) {
          // Implement delete logic
        }
        break;
      // Implement other actions...
    }
    this.showActionMenu = false;
  }

  setActiveTab(tab: 'payments' | 'notes'): void {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }

  getStatusIcon(): string {
    const icons: Record<string, string> = {
      'Over Time': 'warning',
      'Active': 'bolt',
      'Completed': 'check_circle',
      'Draft': 'edit',
      'Upcoming': 'schedule'
    };
    return icons[this.order.status] || 'help';
  }

  getStatusIconClass(): string {
    const colors: Record<string, string> = {
      'Over Time': 'text-red-500',
      'Active': 'text-blue-500',
      'Completed': 'text-green-500',
      'Draft': 'text-gray-400',
      'Upcoming': 'text-orange-500'
    };
    return colors[this.order.status] || 'text-gray-400';
  }

  getStatusTextClass(): string {
    const colors: Record<string, string> = {
      'Over Time': 'text-red-500 font-medium',
      'Active': 'text-blue-500 font-medium',
      'Completed': 'text-green-500 font-medium',
      'Draft': 'text-gray-500 font-medium',
      'Upcoming': 'text-orange-500 font-medium'
    };
    return colors[this.order.status] || 'text-gray-500 font-medium';
  }
}
