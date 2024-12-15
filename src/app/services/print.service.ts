import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  printOrder(order: Order): void {
    // Create print content
    const printContent = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <h1 style="margin: 0;">Order #${order.id}</h1>
          <div>${new Date().toLocaleDateString()}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <h2>Customer Information</h2>
          <p>Name: ${order.customer.name}</p>
          <p>Channel: ${order.customer.channel}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2>Order Details</h2>
          <p>Status: ${order.status}</p>
          <p>Start Date: ${new Date(order.startDate).toLocaleString()}</p>
          <p>End Date: ${new Date(order.endDate).toLocaleString()}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2>Items</h2>
          <ul>
            ${order.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h2>Payment Summary</h2>
          <p>Total Amount: $600.00</p>
          <p>Paid: $200.00</p>
          <p>Outstanding: $400.00</p>
        </div>
      </div>
    `;

    // Create print window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Order #${order.id}</title>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
}
