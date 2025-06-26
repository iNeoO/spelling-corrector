import { describe, expect, it } from 'vitest';
import { buildWordFreq, getWordsFromFile } from '../../core/word';

const filePath = './src/tests/data/test-corpus.txt';

describe('getWordsFromFile', () => {
  it('should yield arrays of words from the file', async () => {
    const chunks: string[] = [];

    for await (const words of getWordsFromFile(filePath)) {
      chunks.push(...words);
    }

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks).toContain('sherlock');
    expect(chunks).toContain('woman');
    expect(chunks).not.toContain('Holmes');
  });
});

describe('buildWordFreq', () => {
  it('should return a frequency map with correct word counts', async () => {
    const freq = await buildWordFreq(filePath);

    expect(freq.get('the')).toBeGreaterThan(1);
    expect(freq.get('sherlock')).toBe(1);
    expect(freq.get('woman')).toBe(1);
    expect(freq.get('zzzz')).toBeUndefined();
  });
});
