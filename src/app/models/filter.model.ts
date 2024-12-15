export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface OrderFilters {
  dateRange: string;
  customDateRange?: {
    start: string;
    end: string;
  };
  channel: string;
  status: string;
  search: string;
}
