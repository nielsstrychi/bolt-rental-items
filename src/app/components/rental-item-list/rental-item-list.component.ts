import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RentalItemService } from '../../services/rental-item.service';
    import { RentalItem } from '../../models/rental-item.model';
    import { OrderStatusComponent } from '../shared/order-status/order-status.component';
    import { OrderAvatarComponent } from '../order-card/order-avatar.component';

    @Component({
      selector: 'app-rental-item-list',
      standalone: true,
      imports: [CommonModule, OrderStatusComponent, OrderAvatarComponent],
      template: `
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-6">Rental Items</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (item of rentalItems; track item.id) {
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-medium">{{item.name}}</h3>
                    <app-order-status [status]="item.status" size="sm"></app-order-status>
                  </div>
                  <button class="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <span class="material-icons text-gray-500">more_horiz</span>
                  </button>
                </div>
                @if (item.customer) {
                  <div class="flex items-center gap-3 mb-4">
                    <app-order-avatar 
                      [initials]="item.customer.avatar"
                      [colorIndex]="item.customer.name.length">
                    </app-order-avatar>
                    <div>
                      <div class="text-sm font-medium">{{item.customer.name}}</div>
                      <div class="text-xs text-gray-500">Via {{item.customer.channel}}</div>
                    </div>
                  </div>
                }
                @if (item.startDate && item.endDate) {
                  <div class="text-sm text-gray-500 mb-4">
                    <span>Rented from:</span>
                    <span class="font-medium">{{formatDate(item.startDate)}}</span>
                    <span>to</span>
                    <span class="font-medium">{{formatDate(item.endDate)}}</span>
                  </div>
                }
                <div class="flex justify-end">
                  <button class="px-3 py-1.5 text-sm text-white bg-black rounded-lg hover:bg-gray-900 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      `
    })
    export class RentalItemListComponent implements OnInit {
      rentalItems: RentalItem[] = [];

      constructor(private rentalItemService: RentalItemService) {}

      ngOnInit() {
        this.rentalItemService.getRentalItems().subscribe(items => {
          this.rentalItems = items;
        });
      }

      formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      }
    }
