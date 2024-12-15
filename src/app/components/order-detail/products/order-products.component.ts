import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg p-6 border border-gray-200">
      <h3 class="text-lg font-medium mb-6">Product Rent ({{items.length}})</h3>
      
      <table class="w-full">
        <thead>
          <tr class="text-xs text-gray-500">
            <th class="pb-4 text-left font-medium">ITEM DETAILS</th>
            <th class="pb-4 text-left font-medium">QUANTITY</th>
            <th class="pb-4 text-right font-medium">CHARGE</th>
            <th class="pb-4 text-right font-medium">TOTAL AMOUNT</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          @for (item of items; track item) {
            <tr class="border-t border-gray-100">
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span class="material-icons text-gray-400">photo_camera</span>
                  </div>
                  <div>
                    <div class="font-medium">{{item}}</div>
                    <div class="text-gray-500">SKU: RNT-SKU-01</div>
                    <div class="text-red-600 mt-1">Hasn't picked up</div>
                  </div>
                </div>
              </td>
              <td class="py-4">1x</td>
              <td class="py-4 text-right">
                <div>2 day(s)</div>
                <div class="text-gray-500">× $200.00/day</div>
              </td>
              <td class="py-4 text-right font-medium">$400.00</td>
            </tr>
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="pt-6">
              <div class="flex flex-col items-end gap-3 text-sm">
                <div class="flex justify-between w-48">
                  <span class="text-gray-600">Subtotal</span>
                  <span class="font-medium">$750.00</span>
                </div>
                <div class="flex justify-between w-48">
                  <span class="text-gray-600">Delivery</span>
                  <span class="font-medium">$0.00</span>
                </div>
                <div class="flex justify-between w-48 text-green-600">
                  <span>(20%) Discount</span>
                  <span>-$150.00</span>
                </div>
                <div class="flex justify-between w-48 pt-3 border-t border-gray-200">
                  <span class="font-medium">Total</span>
                  <span class="font-medium">$600.00</span>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `
})
export class OrderProductsComponent {
  @Input() items!: string[];
}
