describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('moves to /count when click count link', () => {
    cy.visit('/');
    cy.contains('count').click();
    cy.url().should('include', '/count');
  });
});
