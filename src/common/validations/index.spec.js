import {expect} from 'chai';
import { required, email } from './';

describe('validations', () => {
  describe('required', () => {
    it('Given input is empty string, should return error message', () => {
      // Arrange
      const input = '';

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal("HAHAHAHAHAHAHAHAHAHAHAHAHAHA LOLZ");
    });

    it('Given input is undefined, should return error message', () => {
      // Arrange
      const input = undefined;

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal('Required');
    });

    it('Given input is null, should return error message', () => {
      // Arrange
      const input = null;

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal('Required');
    });

    it('Given input is {}, should return undefined', () => {
      // Arrange
      const input = {};

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is [], should return undefined', () => {
      // Arrange
      const input = [];

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is a string of letters, should return undefined', () => {
      // Arrange
      const input = "abc";

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is a string of numbers, should return undefined', () => {
      // Arrange
      const input = "123";

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is a string of letters and numbers, should return undefined', () => {
      // Arrange
      const input = "abc123";

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is a true, should return undefined', () => {
      // Arrange
      const input = true;

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Given input is a false, should return undefined', () => {
      // Arrange
      const input = false;

      // Act
      const output = required(input);

      // Assert
      expect(output).to.equal(undefined);
    });
  });
  describe('email', () => {
    it('Empty string should return undefined', () => {
      // Arrange
      const input = '';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Non empty string should return error message', () => {
      // Arrange
      const input = 'abc';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal('Invalid email address');
    });

    it('Non empty string with @ symbol at end should return error message', () => {
      // Arrange
      const input = 'abc@';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal('Invalid email address');
    });

    it('Non empty string with @ symbol in middle but no TLD should return error message', () => {
      // Arrange
      const input = 'abc@abc';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal(undefined);
    });

    it('Non empty string with @ symbol in middle and ending in . should return error message', () => {
      // Arrange
      const input = 'abc@abc.';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal('Invalid email address');
    });

    it('Non empty string with @ in middle with TLD should return undefined', () => {
      // Arrange
      const input = 'abc@abc.com';

      // Act
      const output = email(input);

      // Assert
      expect(output).to.equal(undefined);
    });
  });
});
