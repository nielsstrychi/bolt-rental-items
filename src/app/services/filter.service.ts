import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderFilters, FilterOption } from '../models/filter.model';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private defaultFilters: OrderFilters = {
    dateRange: 'Last 30 days',
    channel: 'All',
    status: 'All',
    search: ''
  };

  private filtersSubject = new BehaviorSubject<OrderFilters>(this.defaultFilters);
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private isCalendarView = false;

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe(orders => {
      this.ordersSubject.next(orders);
    });
  }

  getFilters(): Observable<OrderFilters> {
    return this.filtersSubject.asObservable();
  }

  getFilteredOrders(): Observable<Order[]> {
    return combineLatest([
      this.ordersSubject,
      this.filtersSubject
    ]).pipe(
      map(([orders, filters]) => this.applyFilters(orders, filters))
    );
  }

  updateFilter(key: keyof OrderFilters, value: any): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      [key]: value
    });
  }

  setCustomDateRange(start: string, end: string): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      dateRange: 'Custom',
      customDateRange: { start, end }
    });
  }

  resetDateRangeFilter(): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({
      ...currentFilters,
      dateRange: this.defaultFilters.dateRange,
      customDateRange: undefined
    });
  }

  getFilterOptions(): Observable<{
    channelOptions: FilterOption[];
    statusOptions: FilterOption[];
  }> {
    return this.ordersSubject.pipe(
      map(orders => {
        const channelCounts = this.getChannelCounts(orders);
        const statusCounts = this.getStatusCounts(orders);

        return {
          channelOptions: [
            { label: 'All channels', value: 'All', count: orders.length },
            { label: 'Website', value: 'Website', count: channelCounts['Website'] || 0 },
            { label: 'In-store', value: 'In-store', count: channelCounts['In-store'] || 0 }
          ],
          statusOptions: [
            { label: 'All statuses', value: 'All', count: orders.length },
            { label: 'Draft', value: 'Draft', count: statusCounts['Draft'] || 0 },
            { label: 'Active', value: 'Active', count: statusCounts['Active'] || 0 },
            { label: 'Over Time', value: 'Over Time', count: statusCounts['Over Time'] || 0 },
            { label: 'Completed', value: 'Completed', count: statusCounts['Completed'] || 0 },
            { label: 'Upcoming', value: 'Upcoming', count: statusCounts['Upcoming'] || 0 }
          ]
        };
      })
    );
  }

  private applyFilters(orders: Order[], filters: OrderFilters): Order[] {
    return orders.filter(order => {
      const matchesSearch = !filters.search || 
        order.items.some(item => item.toLowerCase().includes(filters.search.toLowerCase())) ||
        order.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.id.includes(filters.search);

      const matchesChannel = filters.channel === 'All' || 
        order.customer.channel === filters.channel;

      const matchesStatus = filters.status === 'All' || 
        order.status === filters.status;

      // Skip date range filtering in calendar view
      const matchesDateRange = true;

      return matchesSearch && matchesChannel && matchesStatus && matchesDateRange;
    });
  }

  private getChannelCounts(orders: Order[]): Record<string, number> {
    return orders.reduce((acc, order) => {
      const channel = order.customer.channel;
      acc[channel] = (acc[channel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getStatusCounts(orders: Order[]): Record<string, number> {
    return orders.reduce((acc, order) => {
      const status = order.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  resetFilters(): void {
    this.filtersSubject.next(this.defaultFilters);
  }
}
