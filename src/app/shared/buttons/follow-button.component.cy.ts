import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject, delay, of } from "rxjs";
import { UserService } from "src/app/core";
import { ProfilesService } from "src/app/core/services/profiles.service";
import { FollowButtonComponent } from "./follow-button.component";

describe('FollowComponent', ()=> {
    let mocks = [];
    const userProfile = {
        username: "Sample",
        bio: "",
        image: "",
        following: null,
    };

    beforeEach(()=>{
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
                    isAuthenticated: new BehaviorSubject<boolean>(true)
                }
              }
        ]
    })

    it('should mount',()=> {
        cy.mount(FollowButtonComponent, {
            imports: [RouterTestingModule.withRoutes([])],
            providers: mocks,
            componentProperties: {
                profile: {...userProfile, following: false}
            }
        });
    })


    it('should allow to follow',()=> {
        cy.mount(FollowButtonComponent, {
            imports: [RouterTestingModule.withRoutes([])],
            providers: mocks,
            componentProperties: {
                profile: {...userProfile, following: false},
                toggle: {
                    emit: cy.spy().as('tobispioniert')
                }
            }
        });

        cy.contains('Follow Sample').click();

        cy.get('.btn').should('contain.text', 'Unfollow Sample');

        cy.get('@tobispioniert').should('have.been.called',1)
    })


    it('should allow to follow [AUTOSPY]',()=> {
        cy.mount(FollowButtonComponent, {
            imports: [RouterTestingModule.withRoutes([])],
            providers: mocks,
            autoSpyOutputs: true,
            componentProperties: {
                profile: {...userProfile, following: false}
            }
        });

        cy.contains('Follow Sample').click();

        cy.get('.btn').should('contain.text', 'Unfollow Sample');

        cy.get('@toggleSpy').should('have.been.called',1)
    })

    it('should toggle-toggle-toggle',()=> {
        cy.mount(FollowButtonComponent, {
            imports: [RouterTestingModule.withRoutes([])],
            providers: mocks,
            autoSpyOutputs: true,
            componentProperties: {
                profile: {...userProfile, following: false}
            }
        });

        cy.contains('Follow Sample').click();
    
        cy.get("button").should("not.have.class", "disabled");
        cy.get("button").click();
        cy.get("button").should("have.class", "disabled");
        cy.get("button").should("not.have.class", "disabled");


        cy.get("button").should("not.have.class", "disabled");
        cy.get("button").click();
        cy.get("button").should("have.class", "disabled");
        cy.get("button").should("not.have.class", "disabled");


        cy.get("button").should("not.have.class", "disabled");
        cy.get("button").click();
        cy.get("button").should("have.class", "disabled");
        cy.get("button").should("not.have.class", "disabled");

        cy.get('.btn').should('contain.text', 'Follow Sample');

    })

    it('should allow to follow mount as template',()=> {
        cy.mount(
            `<app-follow-button (toggle)="toggle.emit($event)" [profile]="profile"></app-follow-button>`, 
            {
            imports: [RouterTestingModule.withRoutes([])],
            providers: mocks,
            declarations: [FollowButtonComponent],
            componentProperties: {
                profile: {...userProfile, following: false},
                toggle: {
                    emit: cy.spy().as('toggleSpy')
                }
            }
        });

        cy.contains('Follow Sample').click();

        cy.get('.btn').should('contain.text', 'Unfollow Sample');

        cy.get('@toggleSpy').should('have.been.called',1)
    })
    
});