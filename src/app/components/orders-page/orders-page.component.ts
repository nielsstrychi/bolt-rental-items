import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../order-card/order-card.component';
import { OrdersHeaderComponent } from './orders-header.component';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { FilterService } from '../../services/filter.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, OrderCardComponent, OrdersHeaderComponent, CalendarViewComponent],
  template: `
    <div class="p-6">
      <app-orders-header
        [currentView]="currentView"
        (onViewChange)="currentView = $event">
      </app-orders-header>
      
      @if (currentView === 'card') {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (order of getSortedOrders(); track order.id) {
            <app-order-card [order]="order"></app-order-card>
          }
        </div>
      } @else {
        <app-calendar-view [orders]="filteredOrders"></app-calendar-view>
      }
    </div>
  `
})
export class OrdersPageComponent implements OnInit {
  filteredOrders: Order[] = [];
  currentView: 'card' | 'calendar' = 'card';

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.getFilteredOrders().subscribe(orders => {
      this.filteredOrders = orders;
    });
  }

  getSortedOrders(): Order[] {
    return [...this.filteredOrders].sort((a, b) => {
      const idA = parseInt(a.id);
      const idB = parseInt(b.id);
      return idB - idA; // Sort in descending order (highest ID first)
    });
  }
}
