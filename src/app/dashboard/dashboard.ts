import { Component } from '@angular/core';
import { DashboardHeader } from './shared/dashboard-header/dashboard-header';
import { RouterOutlet } from '@angular/router';
import { DashboardFooter } from './shared/dashboard-footer/dashboard-footer';
import { Sidebar } from './shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [RouterOutlet,DashboardHeader,DashboardFooter,Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
