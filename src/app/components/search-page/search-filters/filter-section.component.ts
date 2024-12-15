import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-4 border-b border-gray-100">
      <button 
        *ngIf="expandable"
        class="w-full flex items-center justify-between"
        (click)="isExpanded = !isExpanded">
        <h3 class="text-sm font-medium text-gray-900">{{title}}</h3>
        <span 
          class="material-icons text-[20px] text-gray-400" 
          [@rotateIcon]="isExpanded ? 'expanded' : 'collapsed'">
          expand_more
        </span>
      </button>
      <h3 *ngIf="!expandable" class="text-sm font-medium text-gray-900 mb-2">{{title}}</h3>
      
      <div *ngIf="!expandable || isExpanded" @expandContent>
        <div [class.mt-2]="expandable">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('rotateIcon', [
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      state('collapsed', style({
        transform: 'rotate(0)'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('expandContent', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class FilterSectionComponent {
  @Input() title!: string;
  @Input() expandable = true;
  isExpanded = true;
}
