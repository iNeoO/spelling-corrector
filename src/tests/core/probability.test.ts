import { describe, expect, it } from 'vitest';
import { N, P } from '../../core/probability';

describe('N', () => {
  it('should calcul the total', () => {
    const corpus = new Map([
      ['cat', 3],
      ['dog', 2],
      ['mouse', 1],
    ]);
    expect(N(corpus)).toBe(6);
  });
});

describe('P', () => {
  it('should return the probability of a word in the corpus', () => {
    const corpus = new Map([
      ['cat', 3],
      ['dog', 2],
      ['mouse', 1],
    ]);
    const total = N(corpus);

    expect(P('cat', corpus, total)).toBeCloseTo(0.5);
    expect(P('dog', corpus, total)).toBeCloseTo(2 / 6);
    expect(P('mouse', corpus, total)).toBeCloseTo(1 / 6);
  });
});
