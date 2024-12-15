import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchFiltersComponent, SearchListComponent, SearchDetailComponent],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Left Filters Column -->
      <div [@filterPanel]="showFilters ? 'expanded' : 'collapsed'" class="bg-white border-r border-gray-200 overflow-hidden">
        <app-search-filters *ngIf="showFilters" @fadeIn></app-search-filters>
      </div>

      <!-- Middle List Column -->
      <div class="flex-1 flex flex-col">
        <!-- Toggle Filters Button -->
        <div class="p-4 border-b border-gray-200">
          <button 
            (click)="toggleFilters()"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
            <span class="material-icons text-[18px]" [@rotateIcon]="showFilters ? 'rotated' : 'default'">
              {{showFilters ? 'filter_list_off' : 'filter_list'}}
            </span>
            {{showFilters ? 'Hide Filters' : 'Show Filters'}}
          </button>
        </div>
        
        <app-search-list class="flex-1 border-r border-gray-200 overflow-y-auto"></app-search-list>
      </div>

      <!-- Right Detail Column -->
      <app-search-detail class="w-[480px] bg-white overflow-y-auto"></app-search-detail>
    </div>
  `,
  animations: [
    trigger('filterPanel', [
      state('expanded', style({
        width: '280px',
        visibility: 'visible'
      })),
      state('collapsed', style({
        width: '0',
        visibility: 'hidden'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('rotateIcon', [
      state('default', style({
        transform: 'rotate(0)'
      })),
      state('rotated', style({
        transform: 'rotate(180deg)'
      })),
      transition('default <=> rotated', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SearchPageComponent {
  showFilters = false;

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
