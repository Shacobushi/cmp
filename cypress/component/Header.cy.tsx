import Header from "../../src/components/Header";

describe("Header Component", () => {
  it("renders the header with the default search input", () => {
    cy.mount(
      <Header
        searchedCampaign={""}
        setSearchedCampaign={(value: string) => console.log(value)}
      />
    );
    cy.get(".search-input").should("have.value", "");
  });

  it("expands the search input on click and collapses on blur", () => {
    cy.mount(
      <Header
        searchedCampaign={""}
        setSearchedCampaign={() => console.log("")}
      />
    );
    cy.get(".search-input").should("have.css", "width", "180px");
    cy.get(".search-input").click();
    cy.get(".search-input").should("have.css", "width", "300px");
    cy.get('[type="text"]').blur();
    cy.get(".search-input").should("have.css", "width", "180px");
  });

  it("updates the search value on input change", () => {
    cy.mount(
      <Header
        searchedCampaign={""}
        setSearchedCampaign={() => console.log("")}
      />
    );
    cy.get(".search-input")
      .invoke("prop", "value", "Test Campaign")
      .should("have.value", "Test Campaign");
  });

  it("updates the passed value from the props", () => {
    cy.mount(
      <Header
        searchedCampaign={"Test Campaign"}
        setSearchedCampaign={() => console.log("")}
      />
    );
    cy.get('[type="text"]').should("have.value", "Test Campaign");
  });
});
