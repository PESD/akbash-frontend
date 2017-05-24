import { Component, OnInit } from '@angular/core';
import { TabMenuModule,MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  private menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      {label: 'My Dashboard', icon: 'fa-tachometer', routerLink: '/dashboard'},
      {label: 'Workflows', icon: 'fa-exchange', routerLink: '/workflows'},
      {label: 'New Hires', icon: 'fa-user', routerLink: '/employees'},
      {label: 'Login', icon: 'fa-sign-in', routerLink: '/login'},
    ];
  }

}
