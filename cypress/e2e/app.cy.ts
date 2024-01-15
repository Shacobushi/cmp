import moment from "moment";
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.window().then((window: any) => window.addCampaigns([
      { "id": 1, "name": "Divavu", "startDate": moment().subtract(1, "days").format("MM/DD/YYYY"), "endDate": moment().add(1, "days").format("MM/DD/YYYY"), "budget": 88377 },
      { "id": 2, "name": "Jaxspan", "startDate": moment().subtract(2, "days").format("MM/DD/YYYY"), "endDate": moment().add(2, "days").format("MM/DD/YYYY"), "budget": 608715 },
      { "id": 3, "name": "Miboo", "startDate": moment().subtract(3, "days").format("MM/DD/YYYY"), "endDate": moment().add(3, "days").format("MM/DD/YYYY"), "budget": 239507 },
      { "id": 4, "name": "Trilith", "startDate": moment().subtract(4, "days").format("MM/DD/YYYY"), "endDate": moment().add(4, "days").format("MM/DD/YYYY"), "budget": 179838 },
      { "id": 5, "name": "Layo", "startDate": moment().subtract(5, "days").format("MM/DD/YYYY"), "endDate": moment().add(5, "days").format("MM/DD/YYYY"), "budget": 837850 },
      { "id": 6, "name": "Photojam", "startDate": moment().subtract(6, "days").format("MM/DD/YYYY"), "endDate": moment().add(6, "days").format("MM/DD/YYYY"), "budget": 858131 },
      { "id": 7, "name": "Blogtag", "startDate": moment().subtract(7, "days").format("MM/DD/YYYY"), "endDate": moment().add(7, "days").format("MM/DD/YYYY"), "budget": 109078 },
      { "id": 8, "name": "Rhyzio", "startDate": moment().subtract(8, "days").format("MM/DD/YYYY"), "endDate": moment().add(8, "days").format("MM/DD/YYYY"), "budget": 272552 },
      { "id": 9, "name": "Zoomcast", "startDate": moment().subtract(9, "days").format("MM/DD/YYYY"), "endDate": moment().add(9, "days").format("MM/DD/YYYY"), "budget": 301919 },
      { "id": 10, "name": "Realbridge", "startDate": moment().subtract(10, "days").format("MM/DD/YYYY"), "endDate": moment().subtract(1, "days").format("MM/DD/YYYY"), "budget": 505602 }
    ]));
  });

  it('Displays the correct number of rows', () => {
    cy.get("tbody").find("tr").should("have.length", 10);
  });
  it('Filters campaigns by name', () => {
    cy.get('[placeholder="Search"]').type("Diva");
    cy.contains("Divavu").should("exist");
    cy.get('[data-icon="circle-check"]').should("exist")
    cy.contains("active").should("exist")
    cy.contains(moment().subtract(1, "days").format("MM/DD/YYYY")).should("exist")
    cy.contains(moment().add(1, "days").format("MM/DD/YYYY")).should("exist")
    cy.contains("Realbridge").should("not.exist");
    cy.get('[placeholder="Search"]').clear();
    cy.contains("Realbridge").should("exist");
  });
  it('Open the Sidebar and try filters', () => {
    cy.contains("Filter By Period").should("not.exist")
    cy.get("[aria-label='filter']").click()
    cy.contains('Filter by Period').should('exist');
    cy.get('#start').click();
    const currentDate = moment();
    // Test Starting Date
    if (currentDate.date() <= 2) {
      cy.contains('button', moment(moment().subtract(0, "days").format("MM/DD/YYYY")).date()).click();
      cy.contains('button', "OK").click()
      cy.get("tbody").find("tr").should("have.length", 1);
      cy.get("[id='start-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
    }
    if (currentDate.date() > 2) {
      cy.contains('button', moment(moment().subtract(2, "days").format("MM/DD/YYYY")).date()).click();
      cy.contains('button', "OK").click()
      cy.get("tbody").find("tr").should("have.length", 2);
      cy.get("[id='start-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
    }
    // Test End Date
    const maxDaysInMonth = moment().daysInMonth();
    if (currentDate.date() < (maxDaysInMonth - 1)) {
      cy.get('#end').click();
      cy.contains('button', moment(moment().add(2, "days").format("MM/DD/YYYY")).date()).click();
      cy.contains('button', "OK").click()
      cy.get("tbody").find("tr").should("have.length", 3);
      cy.get("[id='end-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
      cy.get("[id='end-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 3);
      cy.get("[id='end-chip-delete'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
    } else {
      cy.get('#end').click();
      cy.contains('button', moment(moment().add(0, "days").format("MM/DD/YYYY")).date()).click();
      cy.contains('button', "OK").click()
      cy.get("tbody").find("tr").should("have.length", 2);
      cy.get("[id='end-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
      cy.get("[id='end-chip'").click();
      cy.get("tbody").find("tr").should("have.length", 2);
      cy.get("[id='end-chip-delete'").click();
      cy.get("tbody").find("tr").should("have.length", 10);
    }
    cy.get("[id='start-chip'").click();
    cy.get("tbody").find("tr").should("have.length", currentDate.date() <= 2 ? 1 : 2);
    cy.get("[id='start-chip-delete'").click();
    cy.get("tbody").find("tr").should("have.length", 10);
  });
  it('Adds more entries increase and reduce the entry displayed and navigates between pages', () => {
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.window().then((window: any) => window.addCampaigns([
      { "id": 1, "name": "Divavu", "startDate": moment().subtract(1, "days").format("MM/DD/YYYY"), "endDate": moment().add(1, "days").format("MM/DD/YYYY"), "budget": 88377 },
      { "id": 2, "name": "Jaxspan", "startDate": moment().subtract(2, "days").format("MM/DD/YYYY"), "endDate": moment().add(2, "days").format("MM/DD/YYYY"), "budget": 608715 },
      { "id": 3, "name": "Miboo", "startDate": moment().subtract(3, "days").format("MM/DD/YYYY"), "endDate": moment().add(3, "days").format("MM/DD/YYYY"), "budget": 239507 },
      { "id": 4, "name": "Trilith", "startDate": moment().subtract(4, "days").format("MM/DD/YYYY"), "endDate": moment().add(4, "days").format("MM/DD/YYYY"), "budget": 179838 },
      { "id": 5, "name": "Layo", "startDate": moment().subtract(5, "days").format("MM/DD/YYYY"), "endDate": moment().add(5, "days").format("MM/DD/YYYY"), "budget": 837850 },
      { "id": 6, "name": "Photojam", "startDate": moment().subtract(6, "days").format("MM/DD/YYYY"), "endDate": moment().add(6, "days").format("MM/DD/YYYY"), "budget": 858131 },
      { "id": 7, "name": "Blogtag", "startDate": moment().subtract(7, "days").format("MM/DD/YYYY"), "endDate": moment().add(7, "days").format("MM/DD/YYYY"), "budget": 109078 },
      { "id": 8, "name": "Rhyzio", "startDate": moment().subtract(8, "days").format("MM/DD/YYYY"), "endDate": moment().add(8, "days").format("MM/DD/YYYY"), "budget": 272552 },
      { "id": 9, "name": "Zoomcast", "startDate": moment().subtract(9, "days").format("MM/DD/YYYY"), "endDate": moment().add(9, "days").format("MM/DD/YYYY"), "budget": 301919 },
      { "id": 10, "name": "Realbridge", "startDate": moment().subtract(10, "days").format("MM/DD/YYYY"), "endDate": moment().add(10, "days").format("MM/DD/YYYY"), "budget": 505602 }
    ]));
    cy.contains('p', '1–10 of 20').should('exist');
    cy.get('[role="combobox"]').click();
    cy.contains('[role="option"]', '25').click();
    cy.get('[role="combobox"]').should('contain', '25');
    cy.get("tbody").find("tr").should("have.length", 21);
    cy.get('[role="combobox"]').click();
    cy.contains('[role="option"]', '100').click();
    cy.get('[role="combobox"]').should('contain', '100');
    cy.get("tbody").find("tr").should("have.length", 21);
    cy.get('[role="combobox"]').click();
    cy.contains('[role="option"]', '10').click();
    cy.get('[role="combobox"]').should('contain', '10');
    cy.get("tbody").find("tr").should("have.length", 10);
    cy.get('button[aria-label="Go to previous page"]').should("be.disabled")
    cy.get('button[aria-label="Go to next page"]').click()
    cy.contains('p', '11–20 of 20').should('exist');
    cy.get('button[aria-label="Go to next page"]').should("be.disabled")
    cy.get('button[aria-label="Go to previous page"]').click()
    cy.contains('p', '1–10 of 20').should('exist');
    cy.get('button[aria-label="Go to previous page"]').should("be.disabled")
  });
  it('Adds all the filter and then remove them all', () => {
    cy.get('[placeholder="Search"]').type("Diva");
    cy.get('.MuiInputBase-root')
      .find('input')
      .should('have.value', 'Diva');
    cy.get("[aria-label='filter']").click()
    cy.get('#start').click();
    cy.contains('button', moment(moment().subtract(0, "days").format("MM/DD/YYYY")).date()).click();
    cy.contains('button', "OK").click()
    cy.get('#end').click();
    cy.contains('button', moment(moment().subtract(0, "days").format("MM/DD/YYYY")).date()).click();
    cy.contains('button', "OK").click()
    cy.get('[data-icon="ellipsis-vertical"]')
      .parent().click();
    cy.contains("Clear All Filter").should("exist");
    cy.get("[role='menuitem']").click()
    cy.get('.MuiInputBase-root')
      .find('input')
      .should('have.value', '');
    cy.get('#start').should('have.value', '');
    cy.get('#end').should('have.value', '');
  });
})