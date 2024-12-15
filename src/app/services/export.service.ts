import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  exportOrder(order: Order): void {
    // Create order data for export
    const orderData = {
      orderId: order.id,
      status: order.status,
      customer: order.customer,
      items: order.items,
      dates: {
        start: new Date(order.startDate).toLocaleString(),
        end: new Date(order.endDate).toLocaleString()
      },
      payment: {
        total: 600.00,
        paid: 200.00,
        outstanding: 400.00
      }
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(orderData, null, 2);
    
    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${order.id}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
