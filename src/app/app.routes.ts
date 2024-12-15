import { Routes } from '@angular/router';
    import { OrdersPageComponent } from './components/orders-page/orders-page.component';
    import { LayoutComponent } from './components/layout/layout.component';
    import { OrderDetailPageComponent } from './components/order-detail';
    import { SearchPageComponent } from './components/search-page/search-page.component';
    import { RentalItemListComponent } from './components/rental-item-list/rental-item-list.component';

    export const routes: Routes = [
      {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'orders', pathMatch: 'full' },
          { path: 'orders', component: OrdersPageComponent },
          { path: 'orders/:id', component: OrderDetailPageComponent },
          { path: 'search', component: SearchPageComponent },
          { path: 'rental-items', component: RentalItemListComponent }
        ]
      }
    ];
