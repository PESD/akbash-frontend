import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InputTextModule, PasswordModule } from "primeng/primeng";
import { AuthService } from "../_services/auth.service";
import { AuthHelper } from "../_helpers/authhelper";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
  /* providers: [AuthService], */
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true;
  username: string;
  password: string;
  authHeaders: AuthHelper;
  returnUrl: string;
  display: boolean = false;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authHeaders = new AuthHelper();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onclick() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        this.display = true;
      }
    );
  }

  onclicklogout() {
    this.authService.logout();
  }
}
