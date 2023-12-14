describe('Add medicine', () => {
  it('should not access this page if not logged in', () => {
    cy.visit('/Users');

    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should not be able to access this page if not laboratory or admin', () => {
    cy.visit('/Login');

    const email = 'testpharmacy@gmail.com';
    const password = 'Password123!';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/AddMedicine');

    //You don't have access to this page
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should not be able to access this page if laboratory not valid', () => {
    cy.visit('/Login');

    const email = 'testlaboratory@gmail.com';
    const password = 'Password123!';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/AddMedicine');

    //You don't have access to this page
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should be able to access this page if laboratory valid', () => {
    cy.visit('/Login');

    const email = 'labosoukra@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/AddMedicine');
  });

  it('should not be able to add a medicine if the one or more fields are empty', () => {
    cy.visit('/Login');

    const email = 'labosoukra@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/AddMedicine');

    cy.get('button[type="submit"]').click();
  });

  it('should be able to add a medicine', () => {
    cy.visit('/Login');

    const email = 'labosoukra@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/AddMedicine');

    cy.get('input[name="name"]').type('Sample Medicine');
    cy.get('textarea[name="desc"]').type(
      'This is a sample medicine description.'
    );
    cy.get('input[name="chem"]').type('Chemical Composition');
    cy.get('textarea[name="side"]').type('Common Side Effects');

    //cy.get('p-dropdown[name="dosage"]').click();
    //cy.get('p-dropdown[name="dosage"]').click().type('Oral').type('{enter}');
    cy.get('[class="p-dropdown p-component"]').click({
      force: true,
      multiple: true,
    });
    cy.get('[role="option"]').contains('Tablet').click(); // Assuming Oral is an option
    cy.get('p-calendar[name="manDate"]').click();
    cy.get('.p-button-label').contains('Today').click();
    cy.get('p-calendar[name="expDate"]').click();
    cy.get('.p-button-label').contains('Today').click();
    cy.get('p-inputNumber[name="price"]').clear().type('50');
    cy.get('p-inputNumber[name="quantity"]').type('100');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/MedicinesList');
  });
});
