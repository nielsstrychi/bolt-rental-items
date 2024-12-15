import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderHeaderComponent } from './header/order-header.component';
import { OrderCustomerComponent } from './customer/order-customer.component';
import { OrderProgressComponent } from './progress/order-progress.component';
import { OrderProductsComponent } from './products/order-products.component';
import { OrderPaymentsComponent } from './payments/order-payments.component';
import { OrderLocationComponent } from './location/order-location.component';
import { OrderNotesComponent } from './notes/order-notes.component';

@Component({
  selector: 'app-order-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    OrderHeaderComponent,
    OrderCustomerComponent,
    OrderProgressComponent,
    OrderProductsComponent,
    OrderPaymentsComponent,
    OrderLocationComponent,
    OrderNotesComponent
  ],
  template: `
    <div class="p-6">
      <!-- Back Button and Breadcrumb -->
      <div class="flex items-center gap-4 mb-4">
        <a 
          routerLink="/orders" 
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <span class="material-icons text-gray-500">arrow_back</span>
        </a>
        <div class="flex items-center gap-2 text-sm">
          <a routerLink="/orders" class="text-gray-500 hover:text-gray-900">Rent Order</a>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900">Order #{{order?.id}}</span>
        </div>
      </div>

      @if (order) {
        <!-- Order Header -->
        <app-order-header
          [order]="order"
          [(activeTab)]="activeTab"
          class="mb-6">
        </app-order-header>

        <!-- Order Info -->
        <div class="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <div class="flex items-center gap-1">
            <span>Ordered:</span>
            <span>Via {{order.customer.channel}}</span>
            <span class="mx-2">•</span>
            <span>{{order.items.length}} Product(s)</span>
            <span class="mx-2">•</span>
            <span class="flex items-center gap-1">
              <span class="material-icons text-[18px]">inventory_2</span>
              Picked up in-store
            </span>
          </div>
          <div class="ml-auto">
            Order created: {{formatDate(order.startDate)}}
          </div>
        </div>

        @if (activeTab === 'payments') {
          <div class="grid grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="col-span-2 space-y-6">
              <!-- Customer Information -->
              <app-order-customer
                [customer]="order.customer">
              </app-order-customer>

              <!-- Order Progress -->
              <app-order-progress
                [startDate]="order.startDate"
                [endDate]="order.endDate"
                [status]="order.status">
              </app-order-progress>

              <!-- Rental Location -->
              <app-order-location></app-order-location>

              <!-- Products -->
              <app-order-products
                [items]="order.items">
              </app-order-products>
            </div>

            <!-- Sidebar -->
            <div>
              <app-order-payments
                [order]="order">
              </app-order-payments>
            </div>
          </div>
        }

        @if (activeTab === 'notes') {
          <app-order-notes></app-order-notes>
        }
      }
    </div>
  `
})
export class OrderDetailPageComponent implements OnInit {
  order?: Order;
  activeTab: 'payments' | 'notes' = 'payments';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      this.orderService.getOrders().subscribe(orders => {
        this.order = orders.find(o => o.id === orderId);
      });
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
