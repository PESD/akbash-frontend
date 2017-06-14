import { Component, OnInit } from '@angular/core';
import { InputTextModule, PasswordModule } from 'primeng/primeng';
import { AuthService } from '../auth.service';
import { AuthHeaders } from '../authheaders';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  /* providers: [AuthService], */
})
export class LoginComponent implements OnInit {

  showLogin: boolean = true;
  username: string;
  password: string;
  authHeaders: AuthHeaders;

  constructor(private authService: AuthService) {
    this.authHeaders = new AuthHeaders;
  }

  ngOnInit() {

  }

  onclick() {
    this.authService.login(this.username, this.password).subscribe(() => {
      console.log("Something got returned")
    });
  }

  onclicklogout() {
    this.authService.logout();
  }

}
