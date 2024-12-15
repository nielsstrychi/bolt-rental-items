import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [
    // Completed Orders from November
    {
      id: '95',
      status: 'Completed',
      items: ['MacBook Pro 16"'],
      startDate: new Date('2024-11-15T09:00:00'),
      endDate: new Date('2024-11-19T09:00:00'),
      customer: {
        name: 'Alice Cooper',
        avatar: 'AC',
        channel: 'Website'
      }
    },
    {
      id: '94',
      status: 'Completed',
      items: ['iPad Pro'],
      startDate: new Date('2024-11-18T14:00:00'),
      endDate: new Date('2024-11-22T14:00:00'),
      customer: {
        name: 'Tom Wilson',
        avatar: 'TW',
        channel: 'In-store'
      }
    },
    {
      id: '93',
      status: 'Completed',
      items: ['iPhone 15 Pro'],
      startDate: new Date('2024-11-20T10:00:00'),
      endDate: new Date('2024-11-24T10:00:00'),
      customer: {
        name: 'Sarah Miller',
        avatar: 'SM',
        channel: 'Website'
      }
    },
    {
      id: '92',
      status: 'Completed',
      items: ['MacBook Air'],
      startDate: new Date('2024-11-25T09:00:00'),
      endDate: new Date('2024-11-29T09:00:00'),
      customer: {
        name: 'James Brown',
        avatar: 'JB',
        channel: 'Website'
      }
    },
    
    // Current Active and Upcoming Orders
    {
      id: '100',
      status: 'Over Time',
      items: ['MacBook Pro 16"'],
      startDate: new Date('2024-12-01T09:00:00'),
      endDate: new Date('2024-12-04T09:00:00'),
      customer: {
        name: 'Darlene Fox',
        avatar: 'DF',
        channel: 'Website'
      }
    },
    {
      id: '101',
      status: 'Active',
      items: ['MacBook Pro 16"'],
      startDate: new Date('2024-12-05T10:00:00'),
      endDate: new Date('2024-12-08T10:00:00'),
      customer: {
        name: 'John Smith',
        avatar: 'JS',
        channel: 'Website'
      }
    },
    {
      id: '102',
      status: 'Upcoming',
      items: ['MacBook Pro 16"'],
      startDate: new Date('2024-12-10T09:00:00'),
      endDate: new Date('2024-12-13T09:00:00'),
      customer: {
        name: 'Emma Wilson',
        avatar: 'EW',
        channel: 'In-store'
      }
    },
    {
      id: '99',
      status: 'Active',
      items: ['iPad Pro'],
      startDate: new Date('2024-12-02T11:30:00'),
      endDate: new Date('2024-12-06T11:30:00'),
      customer: {
        name: 'Ralph Edwards',
        avatar: 'RE',
        channel: 'Website'
      }
    },
    {
      id: '103',
      status: 'Upcoming',
      items: ['iPad Pro'],
      startDate: new Date('2024-12-07T14:00:00'),
      endDate: new Date('2024-12-11T14:00:00'),
      customer: {
        name: 'Sarah Chen',
        avatar: 'SC',
        channel: 'Website'
      }
    },
    {
      id: '98',
      status: 'Active',
      items: ['iPhone 15 Pro'],
      startDate: new Date('2024-12-03T07:00:00'),
      endDate: new Date('2024-12-07T07:00:00'),
      customer: {
        name: 'Courtney Henry',
        avatar: 'CH',
        channel: 'In-store'
      }
    },
    {
      id: '104',
      status: 'Draft',
      items: ['iPhone 15 Pro'],
      startDate: new Date('2024-12-08T09:00:00'),
      endDate: new Date('2024-12-12T09:00:00'),
      customer: {
        name: 'Michael Brown',
        avatar: 'MB',
        channel: 'Website'
      }
    },
    {
      id: '97',
      status: 'Active',
      items: ['MacBook Air'],
      startDate: new Date('2024-12-04T09:00:00'),
      endDate: new Date('2024-12-08T09:00:00'),
      customer: {
        name: 'Mario San',
        avatar: 'MS',
        channel: 'Website'
      }
    },
    {
      id: '105',
      status: 'Upcoming',
      items: ['MacBook Air'],
      startDate: new Date('2024-12-09T10:00:00'),
      endDate: new Date('2024-12-13T10:00:00'),
      customer: {
        name: 'Lisa Johnson',
        avatar: 'LJ',
        channel: 'In-store'
      }
    },
    {
      id: '106',
      status: 'Active',
      items: [
        'MacBook Pro 16"',
        'iPad Pro',
        'Magic Keyboard',
        'Apple Pencil',
        'AirPods Pro'
      ],
      startDate: new Date('2024-12-06T13:00:00'),
      endDate: new Date('2024-12-10T13:00:00'),
      customer: {
        name: 'David Miller',
        avatar: 'DM',
        channel: 'Website'
      }
    }
  ];

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders);
  }
}
