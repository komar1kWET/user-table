import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "fd2-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor() {}
  public ngOnInit(): void {}
}
