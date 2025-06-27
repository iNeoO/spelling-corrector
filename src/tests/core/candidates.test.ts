import { describe, expect, it } from 'vitest';
import { candidates, known } from '../../core/candidates';

describe('known', () => {
  it('should return only words present in the corpus', () => {
    const words = new Set(['cat', 'dog', 'mouse']);
    const corpus = new Map([
      ['cat', 1],
      ['mouse', 2],
    ]);
    const result = known(words, corpus);
    expect(result).toEqual(new Set(['cat', 'mouse']));
  });
});

describe('candidates', () => {
  it('should return the word if it exists in the corpus', () => {
    const corpus = new Map([['cat', 1]]);
    const result = candidates('cat', corpus);
    expect(result.has('cat')).toBe(true);
  });

  it('should return known 1-edit words if original word is unknown', () => {
    const corpus = new Map([['cat', 1]]);
    const result = candidates('ca', corpus);
    expect(result.has('cat')).toBe(true);
  });

  it('should return known 2-edit words if 1-edit and original are unknown', () => {
    const corpus = new Map([['cat', 1]]);
    const result = candidates('catt', corpus);
    expect(result.has('cat')).toBe(true);
  });

  it('should return the word itself as last resort', () => {
    const corpus = new Map([['cat', 1]]);
    const result = candidates('dog', corpus);
    expect(result).toEqual(new Set(['dog']));
  });
});
