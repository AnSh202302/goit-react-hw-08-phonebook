import { describe, expect, it } from 'vitest';
import {
    getPhoneKey,
  isValidName,
    isValidPhone,
  normalizeName,
  normalizePhone,
} from './contactUtils';

describe('normalizePhone', () => {
  it('removes spaces from a phone number', () => {
    expect(normalizePhone('+39 333 123 4567')).toBe('+393331234567');
  });
});

describe('isValidName', () => {
  it('accepts names with letters, spaces, apostrophes, or hyphens', () => {
    expect(isValidName('Jacob Mercer')).toBe(true);
    expect(isValidName("D'Artagnan")).toBe(true);
    expect(isValidName('Anne-Marie')).toBe(true);
  });

  it('rejects empty names and names containing digits', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName('Alex2')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts digits with supported formatting', () => {
   expect(isValidPhone(normalizePhone('+39 (333) 123-4567'))).toBe(true);
    expect(isValidPhone('1234567')).toBe(true);
  });

  it('rejects letters and values without digits', () => {
    expect(isValidPhone('+39-ABC')).toBe(false);
    expect(isValidPhone('---')).toBe(false);
  });
});

describe('normalizeName', () => {
  it('trims and collapses extra whitespace', () => {
    expect(normalizeName('  Jacob   Mercer  ')).toBe('Jacob Mercer');
  });
});

describe('getPhoneKey', () => {
  it('removes formatting so equivalent numbers have the same key', () => {
    expect(getPhoneKey('+39 (333) 123-4567')).toBe('393331234567');
    expect(getPhoneKey('+39 (333) 123-4567')).toBe(
      getPhoneKey('393331234567')
    );
  });
});