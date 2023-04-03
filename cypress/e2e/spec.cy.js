describe("Create Account Script", () => {
  it("Creates an account that will be disabled after 5-10 mins", () => {
    const customTimeOut = { timeout: 1000000 };

    cy.visit("https://demo.beta.reportheld.com/admin/main.html#users");

    cy.get("#username", customTimeOut).type("t-christian");

    cy.get("#password").type("asdfasdf");

    cy.get("#login").click();

    cy.contains("button", "Ok", customTimeOut).click();

    cy.get(".menu-item-icon.fa.fa-users").click();

    cy.get(":nth-child(2) > .recommended-input", customTimeOut).type(
      "testuser12345"
    );

    cy.get(":nth-child(3) > .recommended-input").type("password123");

    cy.contains("First Name")
      .parent()
      .within(() => {
        cy.get("input").should("be.visible").first().type("Christian");
      });

    cy.get(".recommended-input").should("be.visible").eq(1).type("Fermilan");

    cy.get('[type="date"]').should("be.visible").type("1999-11-20");

    cy.get('[data-bind="value: email"]')
      .should("be.visible")
      .type("cfermilan@ssct.edu.ph");

    cy.get('[data-bind="value: phone"]').type("0987654321");

    cy.get(
      ".recommended-input-primary-group > .btn-group > .btn",
      customTimeOut
    ).click();

    cy.get(".dropdown-menu.open")
      .find("a")
      .contains("Just t-christian (PUldy56K)")
      .click();

    cy.get(
      ":nth-child(8)> .btn-group > .btn > .filter-option",
      customTimeOut
    ).click();
    cy.get(".dropdown-menu.open").find("a").contains("General User").click();

    cy.get(".item-with-add-button > .btn-group > .btn", customTimeOut)
      .should("be.visible")
      .click();

    cy.get(
      '.item-with-add-button > .btn-group > .open > .dropdown-menu > [data-original-index="1"] > a',
      customTimeOut
    )
      .should("be.visible")
      .click();

    cy.get('button[type="button"]', customTimeOut).contains("Save").click();

    cy.get('[data-bind="visible: !hideOkButton()"] > .second > .btn')
      .contains("Ok")
      .click();

    cy.contains("td", "testuser12345").parent("tr").click();

    cy.wait(300000);

    cy.get(
      "button[data-bind=\"text: $parent.getWhitelabeledTranslation('common', 'disableUser'), attr: {title: $parent.getWhitelabeledTranslation('common', 'disableUserTitle')}, event: { click: $parent.disableUser.bind($parent) }\"]"
    ).click();
  });
});

// Group add

//
