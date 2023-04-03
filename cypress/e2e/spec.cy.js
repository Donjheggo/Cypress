describe("Create Account Script", () => {
  it("Creates an account that will be disabled after 5-10 mins", () => {
    const customTimeOut = { timeout: 1000000 };

    cy.visit("https://demo.beta.reportheld.com/admin/main.html#users");

    // Login form
    cy.get("#username", customTimeOut).type("t-christian");
    cy.get("#password").type("asdfasdf");
    cy.get("#login").click();

    // Welcome OK
    cy.contains("button", "Ok", customTimeOut).click();

    // User navigation
    cy.get(".menu-item-icon.fa.fa-users").click();


    // Username form
    cy.get(":nth-child(2) > .recommended-input", customTimeOut).type(
      "testuser999"
    );

    // Password form
    cy.get(":nth-child(3) > .recommended-input").type("password123");

    // Firstname Form
    cy.contains("First Name")
      .parent()
      .within(() => {
        cy.get("input").should("be.visible").first().type("Christian");
      });

    // Lastname Form
    cy.get(".recommended-input").should("be.visible").eq(1).type("Fermilan");

    // Birthday Form
    cy.get('[type="date"]').should("be.visible").type("1999-11-20");

    // Email form
    cy.get('[data-bind="value: email"]')
      .should("be.visible")
      .type("cfermilan@ssct.edu.ph");

    // Phone number Form
    cy.get('[data-bind="value: phone"]').type("0987654321");


    // Primary Group
    cy.get(
      ".recommended-input-primary-group > .btn-group > .btn",
      customTimeOut
    ).click();
    cy.get(".dropdown-menu.open")
      .find("a")
      .contains("Just t-christian (PUldy56K)")
      .click();

    
    // User configuration presets
    cy.get(
      ":nth-child(8)> .btn-group > .btn > .filter-option",
      customTimeOut
    ).click();
    cy.get(".dropdown-menu.open").find("a").contains("General User").click();


    // Add group
    cy.get(".item-with-add-button > .btn-group > .btn", customTimeOut)
      .should("be.visible")
      .click();
    cy.get(
      '.item-with-add-button > .btn-group > .open > .dropdown-menu > [data-original-index="1"] > a',
      customTimeOut
    )
      .should("be.visible")
      .click();

    // Save Button
    cy.get('button[type="button"]', customTimeOut).contains("Save").click();


    // Confirm Button
    cy.get('[data-bind="visible: !hideOkButton()"] > .second > .btn')
      .contains("Ok")
      .click();

    // Click the user in the table
    cy.contains("td", "testuser999").parent("tr").click();

    // Wait for 5 minutes
    cy.wait(300000);

    // Disable Button
    cy.get(
      "button[data-bind=\"text: $parent.getWhitelabeledTranslation('common', 'disableUser'), attr: {title: $parent.getWhitelabeledTranslation('common', 'disableUserTitle')}, event: { click: $parent.disableUser.bind($parent) }\"]"
    ).click();

    // Confirm Button
    cy.get('button[data-bind="click: ok, text: okText, css: okButtonClasses"]')
    .click();
    
  });
});

