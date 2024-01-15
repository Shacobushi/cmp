// header.spec.js

import CampaignTable from "../../src/components/Table";
import moment from "moment";

const mockData = [
  {
    id: 1,
    name: "Campaign 1",
    startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").format("YYYY-MM-DD"),
    budget: 1000,
  },
  {
    id: 2,
    name: "Campaign 2",
    startDate: moment().subtract(2, "days").format("YYYY-MM-DD"),
    endDate: moment().add(2, "days").format("YYYY-MM-DD"),
    budget: 1000,
  },
  {
    id: 3,
    name: "Campaign 3",
    startDate: moment().subtract(3, "days").format("YYYY-MM-DD"),
    endDate: moment().add(3, "days").format("YYYY-MM-DD"),
    budget: 1000,
  },
];

describe("CampaignTable Component", () => {
  it("renders the table with the correct number of rows", () => {
    cy.mount(
      <CampaignTable
        data={mockData}
        searchedCampaign=''
        startDateFilter=''
        endDateFilter=''
        resetStartDate={() => {}}
        resetEndDate={() => {}}
        resetFilters={() => {}}
        handleSidebar={() => {}}
      />
    );
    cy.get("tbody").find("tr").should("have.length", 4);
  });

  it("filters the table based on searchedCampaign", () => {
    cy.mount(
      <CampaignTable
        data={mockData}
        searchedCampaign='Campaign 2'
        startDateFilter=''
        endDateFilter=''
        resetStartDate={() => {}}
        resetEndDate={() => {}}
        resetFilters={() => {}}
        handleSidebar={() => {}}
      />
    );
    cy.get("tbody").find("tr").should("have.length", 2);
    cy.contains("Campaign 2").should("exist");
  });

  it("it applies the date filters properly", () => {
    cy.mount(
      <CampaignTable
        data={mockData}
        searchedCampaign=''
        startDateFilter={moment().subtract(3, "days").format("YYYY-MM-DD")}
        endDateFilter={moment().add(2, "days").format("YYYY-MM-DD")}
        resetStartDate={() => {}}
        resetEndDate={() => {}}
        resetFilters={() => {}}
        handleSidebar={() => {}}
      />
    );
    cy.get("tbody").find("tr").should("have.length", 2);
    cy.contains("Campaign 1").should("exist");
    cy.contains("Campaign 2").should("not.exist");
    cy.contains("Campaign 3").should("not.exist");
    cy.contains(`Active until ${moment().add(2, "days").format("M/DD/YYYY")}`)
      .parent(".MuiChip-root")
      .click();
    cy.get("tbody").find("tr").should("have.length", 3);
    cy.contains("Campaign 1").should("exist");
    cy.contains("Campaign 2").should("exist");
    cy.contains("Campaign 3").should("not.exist");
    cy.contains(
      `Active since ${moment().subtract(3, "days").format("M/DD/YYYY")}`
    )
      .parent(".MuiChip-root")
      .click();
    cy.get("tbody").find("tr").should("have.length", 4);
    cy.contains("Campaign 1").should("exist");
    cy.contains("Campaign 2").should("exist");
    cy.contains("Campaign 3").should("exist");
  });
});
