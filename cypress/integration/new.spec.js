describe('the "new" page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should show the new post creation screen', () => {
        cy.get('.new').click()
        cy.get('input[name="title"]').should('exist')
    })
})
