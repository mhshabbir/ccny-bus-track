describe('template spec', () => {
  it('passes', () => {
    // cy.visit('http://localhost:5173'); //initial
    // cy.get('button').contains('Bus Driver').click();

    // cy.get('form').should('be.visible'); //log in form
    // cy.get('input[type="text"]').type('Driver1');
    // cy.get('form').submit();

    // cy.get('h2').contains('Welcome Driver1!'); //logged in
    // cy.get('button').contains('Log Out').click(); //log out
    // cy.get('button').contains('Bus Driver').should('be.visible');
    cy.visit('https://www.amazon.com'); //initial
  })
})