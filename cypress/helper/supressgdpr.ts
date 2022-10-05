
export function surpressGdpr() {
    cy.setCookie("notice_gdpr_prefs", "0,1,2:");
    cy.setCookie("notice_preference", "2:");
    cy.setCookie("notice_behavior", "expressed,eu");
  }