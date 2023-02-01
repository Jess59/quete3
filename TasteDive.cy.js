//<reference types="cypress" />

const API_URL = Cypress.env('API_BASE_URL')
let bands = require('../fixtures/DataTasteDive')

describe('Suite TasteDive API', () =>{


    it('Scénario 1 Méthode GET', ()=>{
        cy.request(Cypress.env('API_BASE_URL'))
      
    })
    it('Scénario 2 Code Status 200', () => {
        cy.BandSearchTasteDive(bands[0].query, bands[0].type, bands[0].limit)
            .then(response => {
                expect(response.status).to.eql(200)
            })
    })
    it("Montre un résultat existant", () => {
        for (let i=0; i<bands.length; i++) {
             cy.BandSearchTasteDive(bands[i].query, bands[i].type, bands[i].limit)
               .then(response => {                                                           
                    console.log(response);
                    expect(response.body).to.have.property('Similar').console.log(response);
                    console.log(response);
                    expect(response.body.Similar).to.have.property('Info').to.be.an("array");
                    console.log(response);
                    expect(response.body.Similar).to.have.property('Results').to.be.an("array");
                    console.log(response)

             let resultsArray = response.body.Similar.Results;
                 resultsArray.forEach(element => {console.log(response)
                 expect(element).to.have.property('Name').to.be.a("string");
                 expect(element).to.have.property('Type').to.be.a("string");
           })
      })
   }
})
 

 it("Montre le type de bande", () => {
   for (let i=0; i<bands.length; i++){
       cy.BandSearchTasteDive(bands[i].query, bands[i].type, bands[i].limit)
       .then(response => {
           let resultsArray = response.body.Similar.Results;
           resultsArray.forEach(element => {
               expect(element.Type).to.equal(bands[i].type);
           })
       })
   }
  
 })

 it('Montre les resultats = max limit', () => {
   cy.BandSearchTasteDive(bands[0].query, bands[0].type, bands[0].limit)
       .then(response => {
           expect(response.body.Similar.Results.length).to.be.at.most(bands[0].limit)
       })
 })

})