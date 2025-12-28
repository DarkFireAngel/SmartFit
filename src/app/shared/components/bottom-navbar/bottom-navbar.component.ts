import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.css']
})
export class BottomNavbarComponent {

  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onFabClick(): void {
    // TODO: Open modal/bottom sheet for adding new item
    console.log('FAB clicked - open add modal');
  }
}
