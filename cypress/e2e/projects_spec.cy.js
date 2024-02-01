describe("Test the projects page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/projects/");

    cy.contains("Projects");

    cy.get("article > a").should("have.length", 25);
    cy.get("article > a")
      .first()
      .within(($a) => {
        cy.get($a).should("have.attr", "href").should("not.be.empty");
        cy.get("h2").should("not.be.empty");
        cy.get("small").should("not.be.empty");
        cy.get("p").should("have.length", 2);
      });
  });
});
