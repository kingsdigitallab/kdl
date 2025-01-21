describe("Test the projects page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/about/people/");

    cy.contains("People");

    cy.get(".people ul > li").should("have.length.gt", 0);
    cy.get(".people ul > li > ol > li > a")
      .first()
      .within(($a) => {
        cy.get($a).should("have.attr", "href").should("not.be.empty");
      });
  });
});
