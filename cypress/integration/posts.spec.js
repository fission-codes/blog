describe('the blog app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/')
  })

// interestingly identity used in the cypress tests persists between
// runs of the tests. I would recommend manually clicking through the sign in
// process the first time the tests run, with a fake email address

  it('shows an empty list', () => {
    cy.get('.post-list').should('exist')
    cy.get('.post-list ol').children().should('have.length', 1)
  })


//   it('starts at the sign in page', () => {
//     cy.get('#root').contains('Sign in with Fission')
//         .should('exist')

//     cy.get('button.login').click()

//     cy.get('button.bg-purple').contains('Create account')
//         .click()
//         // .then((() => cy.visit('http://localhost:3000/')))
//   })

})
