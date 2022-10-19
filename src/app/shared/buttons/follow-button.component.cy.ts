import { Router } from "@angular/router";
import { BehaviorSubject, delay, of } from "rxjs";
import { ProfilesService, UserService } from "src/app/core";
import { FollowButtonComponent } from "./follow-button.component";

describe("FollowButtonComponent", ()=>{
    const userProfile = {
        username: "Sample",
        bio: "",
        image: "",
        following: null,
      };
    const routerMock = { navigate: () => {} };

    const mocks = [
        {
            provide: Router,
            useValue: routerMock
        },
        {
            provide: ProfilesService,
            useValue: {
                follow: (name) => of({...userProfile, following: true}).pipe(delay(100)),
                unfollow: (name) => of({...userProfile, following: false}).pipe(delay(100))
            }
        },
        {
            provide: UserService,
            useValue: {
              isAuthenticated: new BehaviorSubject<boolean>(true),
            },
          },
    ];

    it("allow to follow", ()=>{
        cy.mount('<app-follow-button (toggle)="toggle.emit($event)" [profile]="profile" ></app-follow-button>',{
            componentProperties: {
                profile: {...userProfile, following: false},
                toggle: {
                    emit: cy.spy().as('toggleSpy')
                }
            },
            providers: mocks,
            declarations: [FollowButtonComponent]
        });

        cy.get("button").should("not.have.class", "disabled");
        cy.get('button').should('contain', "Follow Sample");
        cy.get('button').click();
        cy.get("button").should("have.class", "disabled");
        cy.get("button").should("not.have.class", "disabled");
        cy.get('button').should('contain', "Unfollow Sample");
        cy.get('@toggleSpy').should('have.been.calledOnceWith',true);
    })


    it("allow to unfollow", ()=>{
        cy.mount('<app-follow-button (toggle)="toggle.emit($event)" [profile]="profile" ></app-follow-button>',{
            componentProperties: {
                profile: {...userProfile, following: true},
                toggle: {
                    emit: cy.spy().as('toggleSpy')
                }
            },
            providers: mocks,
            declarations: [FollowButtonComponent]
        });

        cy.get("button").should("not.have.class", "disabled");
        cy.get('button').should('contain', "Unfollow Sample");
        cy.get('button').click();
        cy.get("button").should("have.class", "disabled");
        cy.get('button').should('contain', "Follow Sample");
        cy.get("button").should("not.have.class", "disabled");
        cy.get('@toggleSpy').should('have.been.calledOnceWith',false);
    })
})