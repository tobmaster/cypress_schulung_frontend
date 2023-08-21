import './commands';

declare namespace Cypress {
    interface Chainable {
        loginByUi(username: string, password: string): Chainable;
    }
}
