describe('the "new" page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.new').click()
    })

    it('should show the input to enter a title', () => {
        cy.get('input[name="title"]').should('exist')
    })

    it('can create a new post', () => {
        cy.get('input[name="title"]').type('aaa')
        cy.get('textarea').type('bbb')
        cy.get('publish-btn').click()
    })
})
