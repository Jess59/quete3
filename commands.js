//<reference types="cypress"/>

Cypress.Commands.add('BandSearchTasteDive', (query, type, limit) => {
    cy.request({
        url: "https://tastedive.com/api/similar",
        qs: {
            q: query,
            type: type,
            limit: limit,
            
        }
    })
})