describe('profile', () => {
  it('should not be able to access this page if not logged in', () => {
    cy.visit('/Profil');

    cy.url().should('eq', 'http://localhost:4200/');
  });
  it('should not be able to access this page if not validated', () => {
    cy.visit('/Login');

    const email = 'testpharmacy@gmail.com';
    const password = 'Password123!';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Profil');

    cy.url().should('eq', 'http://localhost:4200/');

    cy.get('[data-toastNonValid="tnv"]').should(
      'contain',
      'Your account is not validated yet.'
    );
  });

  it('should be able to access this page if validated', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Profil');
  });

  it('should display user profile details', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Profil');

    const user = {
      name: 'Aziz Zina',
      email: 'aziz.zina2001@gmail.com',
      role: 'admin',
      address: '19 Bis Rue des violettes',
    };

    cy.get('#email').should('have.value', user.email);
    cy.get('#state').should('have.value', user.role);
    cy.get('#name').should('have.value', user.name);
    cy.get('#address').should('have.value', user.address);
  });

  it('should be able to edit info', () => {
    cy.visit('/Login');

    const email = 'laborades@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Profil');

    const updatedUser = {
      name: 'Laboratoire Rades',
      address: 'Rades, Ben Arous',
    };

    cy.get('.button-container').contains('Edit').click();

    cy.get('#name').should('not.be.disabled');
    cy.get('#address').should('not.be.disabled');

    cy.get('#name').clear().type(updatedUser.name);
    cy.get('#address').clear().type(updatedUser.address);

    cy.get('.button-container').contains('Confirm').click();

    cy.get('#name').should('have.value', updatedUser.name);
    cy.get('#address').should('have.value', updatedUser.address);
  });

  it('should cancel editing user details', () => {
    cy.visit('/Login');

    const email = 'laborades@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Profil');

    cy.get('.button-container').contains('Edit').click();

    cy.get('#name').should('not.be.disabled');
    cy.get('#address').should('not.be.disabled');

    cy.get('#name').type('New Name');
    cy.get('#address').type('789 Another St');

    cy.get('.button-container').contains('Cancel').click();

    cy.get('#name').should('be.disabled');
    cy.get('#address').should('be.disabled');

    cy.get('#name').should('have.value', 'Laboratoire Rades');
    cy.get('#address').should('have.value', 'Rades, Ben Arous');
  });
});
