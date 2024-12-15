import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterLink, RouterLinkActive } from '@angular/router';
    import { SidebarIconComponent } from './sidebar-icon.component';
    import { ProfileAvatarComponent } from './profile-avatar.component';
    import { SidebarBrandComponent } from './sidebar-brand.component';
    import { NotificationBadgeComponent } from './notification-badge.component';

    @Component({
      selector: 'app-sidebar',
      standalone: true,
      imports: [
        CommonModule, 
        RouterLink, 
        RouterLinkActive, 
        SidebarIconComponent, 
        ProfileAvatarComponent,
        SidebarBrandComponent,
        NotificationBadgeComponent
      ],
      template: `
        <aside class="w-16 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
          <!-- Top Navigation -->
          <nav class="flex-1 flex flex-col items-center pt-6 space-y-4">
            <app-sidebar-icon icon="home" tooltip="Dashboard" routerLink="/"></app-sidebar-icon>
            <app-sidebar-icon icon="task_alt" tooltip="Tasks" routerLink="/orders"></app-sidebar-icon>
            <app-sidebar-icon icon="bar_chart" tooltip="Analytics"></app-sidebar-icon>
            <app-sidebar-icon icon="group" tooltip="Team"></app-sidebar-icon>
            <app-sidebar-icon icon="shield" tooltip="Security"></app-sidebar-icon>
            <app-sidebar-icon icon="inventory_2" tooltip="Rental Items" routerLink="/rental-items"></app-sidebar-icon>
          </nav>

          <!-- Brand Text -->
          <app-sidebar-brand></app-sidebar-brand>

          <!-- Bottom Section -->
          <div class="flex flex-col items-center space-y-4 mb-6">
            <app-sidebar-icon 
              icon="notifications" 
              [lighter]="true" 
              tooltip="Notifications">
              <app-notification-badge count="9"></app-notification-badge>
            </app-sidebar-icon>
            
            <app-sidebar-icon 
              icon="settings" 
              [lighter]="true" 
              tooltip="Settings">
            </app-sidebar-icon>
            
            <app-sidebar-icon 
              icon="campaign" 
              [lighter]="true" 
              tooltip="Announcements">
              <app-notification-badge count="17"></app-notification-badge>
            </app-sidebar-icon>
            
            <app-profile-avatar 
              initials="ST" 
              tooltip="Your Profile">
            </app-profile-avatar>
          </div>
        </aside>
      `
    })
    export class SidebarComponent {}
