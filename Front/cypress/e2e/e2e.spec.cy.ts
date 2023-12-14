describe('Scenario', () => {
  // it('should register a new pharmacy with valid details', () => {
  //   cy.visit('/Register');

  //   const userData = {
  //     name: 'Test Pharmacy 1',
  //     email: 'testpharmacy1@gmail.com',
  //     password: 'Password123!',
  //     address: '123 test Street',
  //     role: 'pharmacy',
  //   };

  //   cy.get('input[name="name"]').type(userData.name);
  //   cy.get('input[name="email"]').type(userData.email);
  //   cy.get('[data-testId="passwordRegister"]').type(userData.password);
  //   cy.get('input[name="address"]').type(userData.address);
  //   cy.get(`[name="role"][value="${userData.role}"]`).should('be.checked');

  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/Login');
  // });

  // it('should register a new laboratory with valid details', () => {
  //   cy.visit('/Register');

  //   const userData = {
  //     name: 'Test Laboratory 2',
  //     email: 'testlaboratory2@gmail.com',
  //     password: 'Password123!',
  //     address: '123 test Street',
  //     role: 'laboratory',
  //   };

  //   cy.get('input[name="name"]').type(userData.name);
  //   cy.get('input[name="email"]').type(userData.email);
  //   cy.get('[data-testId="passwordRegister"]').type(userData.password);
  //   cy.get('input[name="address"]').type(userData.address);

  //   cy.get('[data-roleCheck="roleCheck"]').click();
  //   cy.get(`[name="role"][value="${userData.role}"]`).should('be.checked');

  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/Login');
  // });

  // it('should register a new laboratory with valid details (this one will be non validated in the futur)', () => {
  //   cy.visit('/Register');

  //   const userData = {
  //     name: 'Test Laboratory 3',
  //     email: 'testlaboratory3@gmail.com',
  //     password: 'Password123!',
  //     address: '123 test Street',
  //     role: 'laboratory',
  //   };

  //   cy.get('input[name="name"]').type(userData.name);
  //   cy.get('input[name="email"]').type(userData.email);
  //   cy.get('[data-testId="passwordRegister"]').type(userData.password);
  //   cy.get('input[name="address"]').type(userData.address);

  //   cy.get('[data-roleCheck="roleCheck"]').click();
  //   cy.get(`[name="role"][value="${userData.role}"]`).should('be.checked');

  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/Login');
  // });

  it('should register a new pharmacy with an already used email', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Pharmacy',
      email: 'aziz.zina2001@gmail.com',
      password: 'Password123!',
      address: '123 test Street',
      role: 'pharmacy',
    };

    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('[data-testId="passwordRegister"]').type(userData.password);
    cy.get('input[name="address"]').type(userData.address);

    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'Email already used');
  });

  // it('should let the admin validate the pharmacy user', () => {
  //   cy.visit('/Login');

  //   const email = 'aziz.zina2001@gmail.com';
  //   const password = 'ZINAaziz10*';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/Users');

  //   const targetPharmacyName = 'Test Pharmacy 1';

  //   // Find the row that corresponds to the target pharmacy
  //   cy.get('[data-pha2="pha2"]')
  //     .contains(targetPharmacyName)
  //     .closest('[data-testid="pharmacy-row"]')
  //     .click();

  //   cy.get('.user-profile').should('be.visible');

  //   cy.get('.p-button-success').click();

  //   cy.url().should('eq', 'http://localhost:4200/Users');
  // });

  // it('should let the admin validate the laboratory user (number 2)', () => {
  //   cy.visit('/Login');

  //   const email = 'aziz.zina2001@gmail.com';
  //   const password = 'ZINAaziz10*';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/Users');

  //   cy.get('[role="tab"]').click({ force: true, multiple: true });

  //   const targetLaboratoryName = 'Test Laboratory 2';

  //   // Find the row that corresponds to the target pharmacy
  //   cy.get('[data-lab2="lab2"]')
  //     .contains(targetLaboratoryName)
  //     .closest('[data-testid2="lab-row"]')
  //     .click();

  //   cy.get('.user-profile').should('be.visible');

  //   cy.get('.p-button-success').click();

  //   cy.url().should('eq', 'http://localhost:4200/Users');
  // });

  // it('should let the admin delete the laboratory user (non validated)', () => {
  //   cy.visit('/Login');

  //   const email = 'aziz.zina2001@gmail.com';
  //   const password = 'ZINAaziz10*';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/Users');

  //   cy.get('[role="tab"]').click({ force: true, multiple: true });

  //   const targetLaboratoryName = 'Test Laboratory 3';

  //   // Find the row that corresponds to the target pharmacy
  //   cy.get('[data-lab2="lab2"]')
  //     .contains(targetLaboratoryName)
  //     .closest('[data-testid2="lab-row"]')
  //     .click();

  //   cy.get('.user-profile').should('be.visible');

  //   cy.get('.p-button-danger').click();

  //   cy.url().should('eq', 'http://localhost:4200/Users');
  // });

  // it('should be able to add a medicine with the valid laboratory', () => {
  //   cy.visit('/Login');

  //   const email = 'testlaboratory2@gmail.com';
  //   const password = 'Password123!';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/AddMedicine');

  //   cy.get('input[name="name"]').type('Sample Medicine');
  //   cy.get('textarea[name="desc"]').type(
  //     'This is a sample medicine description.'
  //   );
  //   cy.get('input[name="chem"]').type('Chemical Composition');
  //   cy.get('textarea[name="side"]').type('Common Side Effects');

  //   //cy.get('p-dropdown[name="dosage"]').click();
  //   //cy.get('p-dropdown[name="dosage"]').click().type('Oral').type('{enter}');
  //   cy.get('[class="p-dropdown p-component"]').click({
  //     force: true,
  //     multiple: true,
  //   });
  //   cy.get('[role="option"]').contains('Tablet').click();
  //   cy.get('p-calendar[name="manDate"]').click();
  //   cy.get('.p-button-label').contains('Today').click();
  //   cy.get('p-calendar[name="expDate"]').click();
  //   cy.get('.p-button-label').contains('Today').click();
  //   cy.get('p-inputNumber[name="price"]').clear().type('50');
  //   cy.get('p-inputNumber[name="quantity"]').type('100');

  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/MedicinesList');
  // });

  // it('should display medicines of the valid laboratory', () => {
  //   cy.visit('/Login');

  //   const email = 'testlaboratory2@gmail.com';
  //   const password = 'Password123!';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/MedicinesList');

  //   const medicines = {
  //     state: 'Non valid',
  //     name: 'Sample Medicine',
  //     price: '50.000',
  //     quantity: '100',
  //   };

  //   // Assert pharmacies are displayed
  //   cy.get('.list-med')
  //     .contains('List of medicines: Test Laboratory 2')
  //     .should('exist');
  //   //data-testid="pharmacy-row"
  //   cy.get('[data-pha1="pha1"]').contains(medicines.name).should('exist');
  //   cy.get('[data-pha2="pha2"]').contains(medicines.price).should('exist');
  //   cy.get('[data-pha3="pha3"]').contains(medicines.quantity).should('exist');
  //   cy.get('[data-pha4="pha4"]').contains(medicines.state).should('exist');
  // });

  // it('should open a dialog with the related informations about the selected medicine and delete it', () => {
  //   cy.visit('/Login');

  //   const email = 'testlaboratory2@gmail.com';
  //   const password = 'Password123!';

  //   cy.get('input[name="email"]').type(email);
  //   cy.get('[data-testId="password"]').type(password);
  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('eq', 'http://localhost:4200/');

  //   cy.visit('/MedicinesList');

  //   const targetPharmacyName = 'Sample Medicine';

  //   // Find the row that corresponds to the target pharmacy
  //   cy.get('[data-pha1="pha1"]').contains(targetPharmacyName).click();

  //   cy.get('.user-profile').should('be.visible');

  //   cy.get('.p-button-danger').click();

  //   cy.url().should('eq', 'http://localhost:4200/MedicinesList');
  // });
});
