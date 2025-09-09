// https://on.cypress.io/api

describe('Test Root', () => {
  it('visits work example', () => {
    cy.visit('/work/MYB%20Plus')
    cy.contains('a', 'VISIT')
  })
})
