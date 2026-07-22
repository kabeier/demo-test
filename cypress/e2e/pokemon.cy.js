describe('template spec', () => {

    // Runs every time
    beforeEach(()=>{
        // visits application url
        cy.visit('')
    })

    it('should have Heading', ()=>{
      cy.get('header').should('be.visible')
    })

    // NEED TO  add  id to pokeContiner.jsx div
    it("should render the Pokemon Card on load",()=>{
      cy.get('#poke-container').children().should('have.length', 1)
    })

    //
    it("should render Pokemon Card corresponding to the user search", ()=>{
      // interaction with the user form
      cy.get("input[id=pokemon-name]").type("Bulbasaur")
      cy.get("button[type=submit]").click()
      
      // outcomes of submission of the form
      cy.get("#poke-container").children().should('have.length', 2)
      cy.get("input[id=pokemon-name]").should("be.visible")
    })
    

    // On the Card component on the PokeCard add id={`${pokemon.name}-card`} 
    it("should render MULTIPLE Pokemon Card corresponding to the user search", ()=>{
        // interaction with the user form

        // bulbasaur
        cy.get("input[id=pokemon-name]").type("Bulbasaur")
        cy.get("button[type=submit]").click()
        cy.get('#bulbasaur-card').should("be.visible")

        // charizard
        cy.get("input[id=pokemon-name]").type("Charizard")
        cy.get("button[type=submit]").click()
        cy.get('#charizard-card').should("be.visible")
        
        // outcomes of submission of the form
        cy.get("#poke-container").children().should('have.length', 3)
        cy.get("input").should("be.visible")
    })

     it("can toggle shiny pokemon", () => {
        // generate bulbasaur card
        cy.get("input[id=pokemon-name]").type("Bulbasaur")
        cy.get("button[type=submit]").click()
        cy.get('#bulbasaur-card').should("be.visible")

        // update shiny state to true
        cy.get('#bulbasaur-card button').contains('Make Shiny').click()
        cy.get('#bulbasaur-card img').should("have.attr",'src').and('include','shiny')

        //update shiny state to false
        cy.get('#bulbasaur-card button').contains('Make Normal').click()
        cy.get('#bulbasaur-card img').should("have.attr",'src').and('not.include','shiny')
    })  

    it("can remove a generated card", () => {
        // generate bulbasaur card
        cy.get("input[id=pokemon-name]").type("Bulbasaur")
        cy.get("button[type=submit]").click()
        cy.get('#bulbasaur-card').should("be.visible")

        // remove card 
        cy.get('#bulbasaur-card button').contains('Remove').click()
        cy.get('#poke-container').children().should("have.length",1)
    })

    it('navigates correctly between pages', () => {
        cy.get('nav a').contains('About').click();
        cy.url().should('include', '/about');

        cy.get('nav a').contains('Home').click();
        cy.url().should('eq', `${Cypress.config('baseUrl')}`);

        // Navigate to details page
        cy.get("input[id=pokemon-name]").type("Bulbasaur")
        cy.get("button[type=submit]").click()
        cy.get('#bulbasaur-card').should("be.visible")

        cy.get('#bulbasaur-card a').contains('Details').click()
        cy.url().should('include', '/pokemon/');
        cy.get("img").should('exist')
    });

})