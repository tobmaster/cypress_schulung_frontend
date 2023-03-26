import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";

import { User, UserService } from "../../core";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  currentUser: User = null;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser
      .pipe
      //delay(4300)
      ()
      .subscribe((userData) => {
        this.currentUser = userData;
      });
  }
}
