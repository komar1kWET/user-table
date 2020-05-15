import { NEVER, Observable } from "rxjs";

import { async, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { EffectsFeatureModule, EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  const initialState = { busyIndicatorCount: 0 };
  const actions$: Observable<Action> = NEVER;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserModule, AppRoutingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FrontDev2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("FrontDev2");
  });
});
