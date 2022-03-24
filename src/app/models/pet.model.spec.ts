import { Pet } from './pet.model';

describe('Pet', () => {
  it('should create an instance', () => {
    expect(new Pet()).toBeTruthy();
  });
});
