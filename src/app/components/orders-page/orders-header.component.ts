import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderButtonComponent } from './header/add-order-button.component';
import { ExportButtonComponent } from './header/export-button.component';
import { ViewToggleComponent } from './header/view-toggle.component';
import { SearchBarComponent } from './header/search-bar.component';
import { FilterButtonComponent } from './header/filter-button.component';
import { FilterService } from '../../services/filter.service';
import { FilterOption } from '../../models/filter.model';

@Component({
  selector: 'app-orders-header',
  standalone: true,
  imports: [
    CommonModule,
    AddOrderButtonComponent,
    ExportButtonComponent,
    ViewToggleComponent,
    SearchBarComponent,
    FilterButtonComponent
  ],
  template: `
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-semibold text-gray-900">Rent Order</h1>
        <span class="text-gray-500">{{totalOrders}} Total orders</span>
      </div>
      <div class="flex items-center gap-3">
        <app-add-order-button></app-add-order-button>
        <app-export-button></app-export-button>
      </div>
    </div>

    <div class="flex items-center gap-4 mb-6">
      <app-search-bar
        (onSearch)="onSearchChange($event)">
      </app-search-bar>
      
      <div class="flex items-center gap-3">
        <!-- Only show date range filter in card view -->
        @if (currentView === 'card') {
          <app-filter-button
            icon="calendar_today"
            label="Date range"
            [value]="getDateRangeDisplay()"
            [options]="dateRangeOptions"
            [selectedValue]="filters.dateRange"
            [customDateRange]="customDateRange"
            (onSelect)="onFilterChange('dateRange', $event)"
            (onDateRangeSelect)="onCustomDateRange($event)">
          </app-filter-button>
        }
        <app-filter-button
          icon="filter_list"
          label="Channel"
          [value]="getFilterDisplay('channel')"
          [options]="channelOptions"
          [selectedValue]="filters.channel"
          (onSelect)="onFilterChange('channel', $event)">
        </app-filter-button>
        <app-filter-button
          icon="tune"
          label="Order status"
          [value]="getFilterDisplay('status')"
          [options]="statusOptions"
          [selectedValue]="filters.status"
          (onSelect)="onFilterChange('status', $event)">
        </app-filter-button>
      </div>

      <div class="ml-auto">
        <app-view-toggle 
          [currentView]="currentView"
          (onViewChange)="onViewToggle($event)">
        </app-view-toggle>
      </div>
    </div>
  `
})
export class OrdersHeaderComponent implements OnInit {
  @Input() currentView: 'card' | 'calendar' = 'card';
  @Output() onViewChange = new EventEmitter<'card' | 'calendar'>();

  filters = {
    dateRange: 'Last 30 days',
    channel: 'All',
    status: 'All'
  };

  customDateRange?: { start: string; end: string };
  totalOrders = 0;
  channelOptions: FilterOption[] = [];
  statusOptions: FilterOption[] = [];

  dateRangeOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'Custom range', value: 'Custom' }
  ];

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.getFilterOptions().subscribe(({ channelOptions, statusOptions }) => {
      this.channelOptions = channelOptions;
      this.statusOptions = statusOptions;
      this.totalOrders = channelOptions[0].count || 0;
    });

    this.filterService.getFilters().subscribe(filters => {
      this.customDateRange = filters.customDateRange;
    });
  }

  onViewToggle(view: 'card' | 'calendar'): void {
    this.currentView = view;
    this.onViewChange.emit(view);
    
    // Reset date range filter when switching to calendar view
    if (view === 'calendar') {
      this.filterService.resetDateRangeFilter();
    }
  }

  getDateRangeDisplay(): string {
    if (this.filters.dateRange === 'Custom' && this.customDateRange) {
      const start = new Date(this.customDateRange.start);
      const end = new Date(this.customDateRange.end);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return this.filters.dateRange;
  }

  getFilterDisplay(type: 'channel' | 'status'): string {
    const options = type === 'channel' ? this.channelOptions : this.statusOptions;
    const value = this.filters[type];
    const option = options.find(opt => opt.value === value);
    return `${value} (${option?.count || 0})`;
  }

  onSearchChange(term: string): void {
    this.filterService.updateFilter('search', term);
  }

  onFilterChange(filterType: keyof typeof this.filters, value: string): void {
    this.filters[filterType] = value;
    this.filterService.updateFilter(filterType, value);
  }

  onCustomDateRange(range: { start: string; end: string }): void {
    this.filterService.setCustomDateRange(range.start, range.end);
  }
}
