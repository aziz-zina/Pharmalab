import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("aziz.zina@gmail.com", "19 bis rue des violettes", "Azouz Zina", "admin", "ZINAaziz10")).toBeTruthy();
  });
});
