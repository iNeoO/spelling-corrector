import { describe, expect, it } from 'vitest';
import { deletes, inserts, replaces, splits, transposes } from '../../core/edits';

describe('splits', () => {
  it('should return all possible (left, right) pairs of a word', () => {
    const result = splits('cat');
    expect(result).toEqual([
      ['', 'cat'],
      ['c', 'at'],
      ['ca', 't'],
      ['cat', ''],
    ]);
  });

  it('should return empty array for empty string', () => {
    const result = splits('');
    expect(result).toEqual([]);
  });
});

describe('deletes', () => {
  it('should return all strings with one character deleted', () => {
    const result = deletes(splits('cat'));
    expect(result).toEqual(['at', 'ct', 'ca']);
  });

  it('should return empty array for empty string', () => {
    const result = deletes(splits(''));
    expect(result).toEqual([]);
  });
});

describe('transposes', () => {
  it('should return all strings with two transposed adjacent characters', () => {
    const result = transposes(splits('cat'));
    expect(result).toEqual(['act', 'cta']);
  });

  it('should return empty array for empty string', () => {
    const result = transposes(splits(''));
    expect(result).toEqual([]);
  });
});

describe('replaces', () => {
  it('should return all strings with one letter replaced by each letter of the alphabet', () => {
    const result = replaces(splits('cat'));

    const expected = ['aat', 'bat', 'dat', 'eat', /* ... */ 'cax', 'cay', 'caz'];
    expected.forEach((variant) => {
      expect(result).toContain(variant);
    });
  });

  it('should return empty array for empty string', () => {
    const result = replaces(splits(''));
    expect(result).toEqual([]);
  });
});

describe('inserts', () => {
  it('should return all strings with a letter of the alphabet inserted at every position', () => {
    const result = inserts(splits('cat'));

    const expected = ['acat', 'bcat', 'ccat', 'dcat', /* ... */ 'catx', 'caty', 'catz'];

    expected.forEach((variant) => {
      expect(result).toContain(variant);
    });
  });

  it('should return empty array for empty string', () => {
    const result = inserts(splits(''));
    expect(result).toEqual([]);
  });
});
