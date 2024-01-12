// import { slowCypressDown } from 'cypress-slow-down';
// slowCypressDown(700);

describe('users', () => {
  it('should not be able to access this page if not logged in', () => {
    cy.visit('/Users');

    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should not be able to access this page if user is not an admin', () => {
    cy.visit('/Login');

    const email = 'testpharmacy@gmail.com';
    const password = 'Password123!';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should be able to access this page if the user is an admin', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');
  });

  it('should display pharmacies', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    const pharmacies = {
      email: 'testpharmacy@gmail.com',
      name: 'Test Pharmacy',
      address: '123 test Street 123',
      state: 'Non valid',
    };

    // Assert pharmacies are displayed
    cy.get('.list-users').contains('List of pharmacies').should('exist');
    cy.get('[data-pha1="pha1"]').contains(pharmacies.email).should('exist');
    cy.get('[data-pha2="pha2"]').contains(pharmacies.name).should('exist');
    cy.get('[data-pha3="pha3"]').contains(pharmacies.address).should('exist');
    cy.get('[data-pha4="pha4"]').contains(pharmacies.state).should('exist');
  });

  it('should open a dialog with the related informations about the selected pharmacy', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    //cy.get('[data-testid="pharmacy-row"]').first().click();
    cy.get('[data-testid="pharmacy-row"]').then(($rows) => {
      // Generate a random index within the range of the number of rows
      const randomIndex = Cypress._.random(0, $rows.length - 1);

      // Get the random row using eq()
      const randomRow = $rows.eq(randomIndex);

      // Click on the random row
      randomRow.click();
    });

    cy.get('.user-profile').should('be.visible');
  });

  it('should validate the selected pharmacy', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    const targetPharmacyName = 'test 2222';

    // Find the row that corresponds to the target pharmacy
    cy.get('[data-pha2="pha2"]')
      .contains(targetPharmacyName)
      .closest('[data-testid="pharmacy-row"]')
      .click();

    cy.get('.user-profile').should('be.visible');

    cy.get('.p-button-success').click();
  });

  it('should check if the fields are not empty when editing', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    const targetPharmacyName = 'test 3333';

    // Find the row that corresponds to the target pharmacy
    cy.get('[data-pha2="pha2"]')
      .contains(targetPharmacyName)
      .closest('[data-testid="pharmacy-row"]')
      .click();

    cy.get('.user-profile').should('be.visible');

    cy.get('.p-button').contains('Edit').click();

    // Assuming there are input fields in the form for editing
    cy.get('#name').clear();
    cy.get('#address').clear();

    // Click the "Save" button
    cy.get('.p-button-success').click();

    cy.get('[data-se="se"]').should('contain', 'Please select a role first.');
  });

  it('should edit the selected pharmacy', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    const targetPharmacyName = 'test 3333';

    // Find the row that corresponds to the target pharmacy
    cy.get('[data-pha2="pha2"]')
      .contains(targetPharmacyName)
      .closest('[data-testid="pharmacy-row"]')
      .click();

    cy.get('.user-profile').should('be.visible');

    cy.get('.p-button').contains('Edit').click();

    // Assuming there are input fields in the form for editing
    cy.get('#name').clear().type('test 3333');
    cy.get('#address').clear().type('New Address');

    cy.get('p-dropdown').click();
    cy.get('[role="option"]').contains('pharmacy').click();

    // Click the "Save" button
    cy.get('.p-button-success').click();
  });

  it('should display laboratories', () => {
    cy.visit('/Login');

    const email = 'aziz.zina2001@gmail.com';
    const password = 'ZINAaziz10*';

    cy.get('input[name="email"]').type(email);
    cy.get('[data-testId="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/');

    cy.visit('/Users');

    //data-lab="lab"
    cy.get('[role="tab"]').click({ force: true, multiple: true });

    const laboratories = {
      email: 'labosoukra@gmail.com',
      name: 'Labo Soukra',
      address: 'Soukra dar fadhal',
      state: 'Valid',
    };

    cy.get('[data-lab1="lab1"]').contains(laboratories.email).should('exist');
    cy.get('[data-lab2="lab2"]').contains(laboratories.name).should('exist');
    cy.get('[data-lab3="lab3"]').contains(laboratories.address).should('exist');
    cy.get('[data-lab4="lab4"]').contains(laboratories.state).should('exist');
  });

  // it('should handle empty user lists', () => {
  //   cy.visit('/Login');

  //   const email = 'aziz.zina2001@gmail.com';
  //   const password = 'ZINAaziz10*';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/Users');

  //   // Assert empty user message is displayed
  //   cy.get('.list-users').contains('Nothing to display yet.').should('exist');
  // });
});
//test
