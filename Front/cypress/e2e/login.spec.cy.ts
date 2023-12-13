describe('login', () => {
  it('should not log in if the form is empty', () => {
    cy.visit('/Login');

    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should(
      'contain',
      'You have to fill the form first'
    );
  });

  it('should not log in with a non valid email', () => {
    cy.visit('/Login');

    const email = 'example.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'Email not valid');
  });

  it("should not log in with an email that doesn't exist", () => {
    cy.visit('/Login');

    const email = 'testerror@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'User not found');
  });

  it('should not log in with a wrong password', () => {
    cy.visit('/Login');

    const email = 'labosoukra@gmail.com';
    const password = 'wrongPassword';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'Incorrect password');
  });

  it('should log in with valid credentials', () => {
    cy.visit('/Login');

    const email = 'labosoukra@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');
  });
});
