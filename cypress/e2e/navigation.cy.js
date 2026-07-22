describe('Navigation', () => {

  it('/ => renders the Home page', () => {
    cy.visit('')
    cy.url().should('eq', `${Cypress.config('baseUrl')}`)
    // Home page renders the Pokemon search
    cy.get('#poke-container').should('exist')
  })

  it('/about => renders the About page', () => {
    cy.visit('about')
    cy.url().should('include', '/about')
    cy.contains('h1', 'About Page').should('be.visible')
  })

  it('/pokemon:id => renders the Pokemon Details page', () => {
    cy.visit('/pokemon/1')
    cy.url().should('include', '/pokemon/1')
    // Details are fetched async; the card image should eventually render
    cy.get('img').should('exist')
  })

  it('* => renders the 404 Not Found page', () => {
    cy.visit('/this-route-does-not-exist')
    cy.get('.mx-auto > div')
    cy.contains('404 Error Page Not Found').should('be.visible')
  })

})
