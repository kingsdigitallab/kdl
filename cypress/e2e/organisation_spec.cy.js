describe("Test an organisation page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/about/partners-and-funders/ddh/");

    cy.get("h1").should("not.be.empty");
    cy.get("h1").contains("Department of Digital Humanities");

    for (const target of ["#partner", "#funded", ".sibling-pagination"]) {
      cy.get(target).within(() => {
        cy.get("li").should("have.length.above", 0);
        cy.get("li")
          .first()
          .get("a")
          .first()
          .within(($a) => {
            cy.get($a).should("not.be.empty");
            cy.get($a).should("have.attr", "href").should("not.be.empty");
          });
      });
    }
  });
});
