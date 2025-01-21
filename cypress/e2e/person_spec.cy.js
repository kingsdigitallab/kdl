describe("Test an organisation page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/about/people/arianna-ciula/");

    cy.get("h1").should("not.be.empty");
    cy.get("h1").contains("Arianna Ciula");
    cy.get(".description").should("not.be.empty");

    for (const target of [".part-of", ".sibling-pagination"]) {
      cy.get(target)
        .first()
        .within(() => {
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
