export interface RentalItem {
      id: string;
      name: string;
      status: 'Available' | 'Rented' | 'Maintenance' | 'Reserved';
      customer?: {
        name: string;
        avatar: string;
        channel: 'Website' | 'In-store';
      };
      startDate?: Date;
      endDate?: Date;
    }
