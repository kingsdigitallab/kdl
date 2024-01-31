describe("Test the projects page", () => {
  it("Visits, gets and asserts", () => {
    cy.visit("/projects/crossreads/");

    cy.title();
    cy.contains("Crossreads");

    cy.get("h1").should("not.be.empty");
    cy.get("h1 > small").should("not.be.empty");

    cy.get("article").within(() => {
      cy.get("img").should("have.attr", "alt").should("not.be.empty");
      cy.get("img").should("have.attr", "src").should("not.be.empty");
      cy.get("figcaption").should("not.be.empty");

      cy.get("#overview").should("not.be.empty");

      cy.get("#team").within(() => {
        cy.get("li").should("have.length.above", 0);
        cy.get("li")
          .first()
          .get("a")
          .should("have.attr", "href")
          .should("not.be.empty");
        cy.get("li").first().get("span").should("not.be.empty");

        // kdl team members
        cy.get("sup").should("have.length.above", 0);
      });

      cy.get(".sibling-pagination").within(() => {
        cy.get("li").should("have.length", 2);
        cy.get("li")
          .first()
          .get("a")
          .should("have.attr", "href")
          .should("not.be.empty");
        cy.get("li")
          .last()
          .get("a")
          .should("have.attr", "href")
          .should("not.be.empty");
      });

      cy.get("#metadata").within(() => {
        cy.get(".status").invoke("text").should("have.length.above", 16);

        for (const target of ["#links", ".funder", ".date"]) {
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

        cy.get(".date").last().should("not.be.empty");
      });
    });
  });
});
