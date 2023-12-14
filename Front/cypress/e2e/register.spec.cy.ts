describe('registration', () => {
  it('should not log in if the form is empty', () => {
    cy.visit('/Login');

    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should(
      'contain',
      'You have to fill the form first'
    );
  });

  it('should register a new pharmacy with an already used email', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Pharmacy',
      email: 'labosoukra@gmail.com',
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

  it('should not log in with a non valid email', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Pharmacy',
      email: 'test.com',
      password: 'Password123!',
      address: '123 test Street',
      role: 'pharmacy',
    };

    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('[data-testId="passwordRegister"]').type(userData.password);
    cy.get('input[name="address"]').type(userData.address);

    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'Email not valid');
  });

  it('should not log in with a password not strong enough', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Pharmacy',
      email: 'test@hotmail.com',
      password: 'password',
      address: '123 test Street',
      role: 'pharmacy',
    };

    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('[data-testId="passwordRegister"]').type(userData.password);
    cy.get('input[name="address"]').type(userData.address);

    cy.get('button[type="submit"]').click();

    cy.get('[data-toastId="toast"]').should('contain', 'Weak password');
  });

  it('should register a new pharmacy with valid details', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Pharmacy',
      email: 'testpharmacy@gmail.com',
      password: 'Password123!',
      address: '123 test Street',
      role: 'pharmacy',
    };

    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('[data-testId="passwordRegister"]').type(userData.password);
    cy.get('input[name="address"]').type(userData.address);
    cy.get(`[name="role"][value="${userData.role}"]`).should('be.checked');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/Login');
  });

  it('should register a new laboratory with valid details', () => {
    cy.visit('/Register');

    const userData = {
      name: 'Test Laboratory',
      email: 'testlaboratory@gmail.com',
      password: 'Password123!',
      address: '123 test Street',
      role: 'laboratory',
    };

    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('[data-testId="passwordRegister"]').type(userData.password);
    cy.get('input[name="address"]').type(userData.address);

    cy.get('[data-roleCheck="roleCheck"]').click();
    cy.get(`[name="role"][value="${userData.role}"]`).should('be.checked');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/Login');
  });
});
