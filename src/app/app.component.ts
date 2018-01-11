import { Component } from "@angular/core";
import { AccordionModule } from "primeng/components/accordion/accordion";
import { DataTableModule, SharedModule } from "primeng/primeng";

import { HttperrorService } from "./_services/httperror.service";

import { Subscription } from "rxjs/Subscription";

import { Globals } from "./global";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Tandem";
  displayHttpError: boolean = false;
  displayHttpErrorMessage: string;
  httpErrorSubscription: Subscription;
  version = Globals.TANDEM_VERSION;

  constructor(private httperrorService: HttperrorService) {
    this.httpErrorSubscription = this.httperrorService.httperror.subscribe(
      value => {
        if (value.isError) {
          this.displayHttpErrorMessage = value.errorMsg;
          this.displayHttpError = true;
        } else {
          this.displayHttpError = false;
        }
      }
    );
  }
}
