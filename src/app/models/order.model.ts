export interface Order {
  id: string;
  status: 'Draft' | 'Active' | 'Over Time' | 'Completed' | 'Upcoming';
  items: string[];
  startDate: Date;
  endDate: Date;
  customer: {
    name: string;
    avatar: string;
    channel: 'Website' | 'In-store';
  };
}
