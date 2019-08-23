import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "shop";

  onActivate($event: any, routerOutlet: RouterOutlet) {
    console.log("Activated Component", $event, routerOutlet);
  }
  onDeactivate($event: any, routerOutlet: RouterOutlet) {
    console.log("Deactivated Component", $event, routerOutlet);
  }
}
