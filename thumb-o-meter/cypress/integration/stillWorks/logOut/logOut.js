/////
//logging out of the app

function logOut() {
  describe("Log out of app", () => {
    it("Get logout button, confirm has 'Log Out' as text and then clicks it", () => {
      cy.wait(1000);
      cy.get("nav")
        .should("have.class", "navBar_container__16Rem css-135tgfi")
        .find("div")
        .should("have.class", "navBar_box__2huli css-ozv6cb")
        .find("div")
        .should("have.class", "navBar_navigation__2KIo9 css-k008qs")
        .find("button")
        .should("have.class", "chakra-button logout_btn__1eIMF css-zgm9my")
        .contains("Log Out")
        .click();
      cy.wait(3000);
      cy.end();
    });
  });
}

export default logOut;

/*

nar bar class "navBar_container__16Rem css-135tgfi"
inside nav bar class "navBar_box__2huli css-ozv6cb"
inside nar bar class "navBar_navigation__2KIo9 css-k008qs"
logout button class "chakra-button logout_btn__1eIMF css-zgm9my"
contains text words LogOut 


*/
