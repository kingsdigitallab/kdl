describe("Test the home page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/");

    cy.get("video");
    cy.get(".hero-content");
    cy.get("a.scroll").click();
    cy.url().should("include", "#explore");

    cy.contains("Featured projects");
    cy.contains("Browse all projects");
    cy.get("div.project").should("have.length", 9);

    cy.get(".blog").scrollIntoView();
    cy.contains("Latest blog posts");
    cy.contains("Browse all posts");
    cy.get("div.post").should("have.length", 3);

    cy.get(".discover").scrollIntoView();
    cy.contains("Activities");
    cy.get("div.activities-block").should("have.length", 3);
    cy.contains("Research areas");
    cy.get("div.research-block").should("have.length", 4);

    cy.get(".contact").scrollIntoView();
    cy.contains("Contact us").click();
    cy.url().should("include", "/contact-us");
    cy.go("back");
    cy.get("section.contact").contains("Frequently Asked Questions").click();
    cy.url().should("include", "/faqs");
    cy.go("back");

    cy.get(".connect").scrollIntoView();
    cy.get(".connect").within(() => {
      cy.get("li").should("have.length", 4);
    });

    cy.scrollTo("top");
  });
});
