import { describe, expect, it } from 'vitest';
import { correction } from '../../core/correction';
import { N } from '../../core/probability';

describe('correction', () => {
  const corpus = new Map([
    ['cat', 5],
    ['dog', 3],
    ['mouse', 2],
  ]);
  const total = N(corpus);

  it('should return the exact word if present in corpus', () => {
    expect(correction('cat', corpus, total)).toBe('cat');
  });

  it('should correct a simple typo to most probable candidate', () => {
    expect(correction('doge', corpus, total)).toBe('dog');
  });

  it('should be case-insensitive', () => {
    expect(correction('MUOS', corpus, total)).toBe('mouse');
  });

  it('should return the original word if no correction found', () => {
    expect(correction('elephant', corpus, total)).toBe('elephant');
  });
});
