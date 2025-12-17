describe("Test the projects page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/about/partners-and-funders/");

    cy.contains("Partners and funders");

    cy.get(".organisations ul > li").should("have.length.gt", 0);
    cy.get(".organisations ul > li > ol > li > a")
      .first()
      .within(($a) => {
        cy.get($a).should("have.attr", "href").should("not.be.empty");
      });
  });
});
