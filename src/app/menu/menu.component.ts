import { Component, OnInit } from '@angular/core';
import { TabMenuModule,MenuItem } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService }      from '../_services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.loggedInSubject.subscribe(value => {
      console.log(`What is the login value? ${value}`);
      this.changeLoginState(value)
    });
  }

  menuItems: MenuItem[];
  loginString: string = "Login";
  isLoggedIn: Observable<boolean>;

  ngOnInit() {
    this.buildMenu();
  }

  changeLoginState(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.loginString = "Logout";
    } else {
      this.loginString = "Login";
    }
    this.buildMenu();
  }

  buildMenu() {
    this.menuItems = [
      {label: 'My Dashboard', icon: 'fa-tachometer', routerLink: '/dashboard'},
      {label: 'Workflows', icon: 'fa-exchange', routerLink: '/workflows'},
      {label: 'New Hires', icon: 'fa-user', routerLink: '/employees'},
      {label: 'New Contractor', icon: 'fa-handshake-o', routerLink: '/contractor'},
      {label: 'Employees', icon: 'fa-users', routerLink: '/employeegrid'},
      {label: this.loginString, icon: 'fa-sign-in', routerLink: '/login'},
    ];
  }

}
