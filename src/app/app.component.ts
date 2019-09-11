import { Component } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { MessagesService } from "./shared";
import { SpinnerService } from './widgets';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "shop";

  constructor(
    public messagesService: MessagesService,
    public spinnerService: SpinnerService,
    private router: Router
  ) {}

  onActivate($event: any, routerOutlet: RouterOutlet) {
    console.log("Activated Component", $event, routerOutlet);
  }
  onDeactivate($event: any, routerOutlet: RouterOutlet) {
    console.log("Deactivated Component", $event, routerOutlet);
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ["messages"] } }]);
    this.messagesService.isDisplayed = true;
  }
}
