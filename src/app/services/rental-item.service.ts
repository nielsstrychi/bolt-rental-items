import { Injectable } from '@angular/core';
    import { BehaviorSubject, Observable, of } from 'rxjs';
    import { RentalItem } from '../models/rental-item.model';

    @Injectable({
      providedIn: 'root'
    })
    export class RentalItemService {
      private mockRentalItems: RentalItem[] = [
        {
          id: '1',
          name: 'MacBook Pro 16"',
          status: 'Rented',
          customer: {
            name: 'Alice Cooper',
            avatar: 'AC',
            channel: 'Website'
          },
          startDate: new Date('2024-12-01T09:00:00'),
          endDate: new Date('2024-12-05T09:00:00')
        },
        {
          id: '2',
          name: 'iPad Pro',
          status: 'Available'
        },
        {
          id: '3',
          name: 'iPhone 15 Pro',
          status: 'Reserved',
          customer: {
            name: 'Tom Wilson',
            avatar: 'TW',
            channel: 'In-store'
          },
          startDate: new Date('2024-12-07T14:00:00'),
          endDate: new Date('2024-12-10T14:00:00')
        },
        {
          id: '4',
          name: 'MacBook Air',
          status: 'Maintenance'
        }
      ];

      private rentalItemsSubject = new BehaviorSubject<RentalItem[]>(this.mockRentalItems);
      rentalItems$ = this.rentalItemsSubject.asObservable();

      getRentalItems(): Observable<RentalItem[]> {
        return of(this.mockRentalItems);
      }

      updateRentalItem(updatedItem: RentalItem): void {
        const currentItems = this.rentalItemsSubject.value;
        const updatedItems = currentItems.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        );
        this.rentalItemsSubject.next(updatedItems);
      }
    }
