import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject, delay, of } from "rxjs";
import { UserService } from "src/app/core";
import { ProfilesService } from "src/app/core/services/profiles.service";
import { FollowButtonComponent } from "./follow-button.component";

describe("FollowButtonComponent", () => {
  let mocks = [];
  const userProfile = {
    username: "Sample",
    bio: "",
    image: "",
    following: null,
  };

  beforeEach(() => {
    const routerMock = { navigate: () => {} };
    const profileServiceMock = {
      follow: (name) =>
        of({ ...userProfile, following: true }).pipe(delay(1000)),
      unfollow: (name) =>
        of({ ...userProfile, following: false }).pipe(delay(1000)),
    };

    mocks = [
      {
        provide: Router,
        useValue: routerMock,
      },
      {
        provide: ProfilesService,
        useValue: profileServiceMock,
      },
      {
        provide: UserService,
        useValue: {
          isAuthenticated: new BehaviorSubject<boolean>(true),
        },
      },
    ];
  });

  it("allow to follow", () => {
    cy.mount(
      '<app-follow-button (toggle)="toggle.emit($event)" [profile]="profile"></app-follow-button>',
      {
        imports: [RouterTestingModule.withRoutes([])],
        providers: mocks,
        componentProperties: {
          profile: { ...userProfile, following: false },
          toggle: {
            emit: cy.spy().as("toggleSpy"),
          },
        },
        declarations: [FollowButtonComponent],
      }
    );

    cy.get("button").should(($el) =>
      expect($el.text().trim()).to.equal("Follow Sample")
    );

    cy.get("button").should("not.have.class", "disabled");
    cy.get("button").click();
    cy.get("button").should("have.class", "disabled");
    cy.get("button").should("not.have.class", "disabled");

    cy.get("button").should(($el) =>
      expect($el.text().trim()).to.equal("Unfollow Sample")
    );

    cy.get("@toggleSpy").should("have.been.called", 1);
  });

  it("allow to unfollow", () => {
    cy.mount(
      '<app-follow-button (toggle)="toggle.emit($event)" [profile]="profile"></app-follow-button>',
      {
        imports: [RouterTestingModule.withRoutes([])],
        providers: mocks,
        componentProperties: {
          profile: { ...userProfile, following: true },
          toggle: {
            emit: cy.spy().as("toggleSpy"),
          },
        },
        declarations: [FollowButtonComponent],
      }
    );

    cy.get("button").should(($el) =>
      expect($el.text().trim()).to.equal("Unfollow Sample")
    );

    cy.get("button").click();

    cy.get("button").should(($el) =>
      expect($el.text().trim()).to.equal("Follow Sample")
    );
    cy.get("@toggleSpy").should("have.been.called", 1);
  });
});
