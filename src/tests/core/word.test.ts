import { describe, expect, it } from 'vitest';
import { buildWordFreqFromFile, buildWordFreqString, getWordsFromFile } from '../../core/word';

const filePath = './src/tests/data/test-corpus.txt';
const noWordsFile = './src/tests/data/no-words.txt';

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

describe('buildWordFreqFromFile', () => {
  it('should return a frequency map with correct word counts', async () => {
    const freq = await buildWordFreqFromFile(filePath);

    expect(freq.get('the')).toBeGreaterThan(1);
    expect(freq.get('sherlock')).toBe(1);
    expect(freq.get('woman')).toBe(1);
    expect(freq.get('zzzz')).toBeUndefined();
  });
});

describe('buildWordFreqString', () => {
  it('should count word frequencies correctly', () => {
    const text = 'Cat dog cat mouse. DOG!';
    const freq = buildWordFreqString(text);

    expect(freq.get('cat')).toBe(2);
    expect(freq.get('dog')).toBe(2);
    expect(freq.get('mouse')).toBe(1);
  });

  it('should handle empty input', () => {
    const freq = buildWordFreqString('');
    expect(freq.size).toBe(0);
  });

  it('should ignore punctuation', () => {
    const text = 'Hello, world! Hello.';
    const freq = buildWordFreqString(text);
    expect(freq.get('hello')).toBe(2);
    expect(freq.get('world')).toBe(1);
  });

  describe('getWordsFromFile', () => {
    it('should yield empty arrays when no word characters are found', async () => {
      const chunks: string[][] = [];

      for await (const words of getWordsFromFile(noWordsFile)) {
        chunks.push(words);
      }

      for (const chunk of chunks) {
        expect(chunk).toEqual([]);
      }
    });
  });
});
