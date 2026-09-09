/**
 * Test Data Generator Utility
 * Replaces Apache Commons RandomStringUtils from the Java BaseClass.
 */

export class DataGenerator {
  /**
   * Generates a random alphabetic string of given length
   */
  static randomString(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random numeric string of given length
   */
  static randomNumbers(length: number = 10): string {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  }

  /**
   * Generates a random alphanumeric string suitable for passwords
   */
  static randomAlphaNumeric(alphaLength: number = 4, numLength: number = 4): string {
    return `${this.randomString(alphaLength)}@${this.randomNumbers(numLength)}`;
  }

  /**
   * Generates a unique email address
   */
  static randomEmail(domain: string = 'gmail.com'): string {
    return `test_${this.randomString(6).toLowerCase()}_${Date.now()}@${domain}`;
  }

  /**
   * Generates random customer registration details
   */
  static generateCustomerData() {
    const password = this.randomAlphaNumeric();
    return {
      firstName: `Auto_${this.randomString(5)}`,
      lastName: `User_${this.randomString(5)}`,
      email: this.randomEmail(),
      telephone: `+1${this.randomNumbers(9)}`,
      password: password,
      confirmPassword: password,
      subscribeNewsletter: false,
      agreePolicy: true,
    };
  }
}
