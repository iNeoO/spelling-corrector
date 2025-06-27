import { beforeEach, describe, expect, it } from 'vitest';
import { SpellChecker } from '../../core/spellChecker';

const filePath = './src/tests/data/test-corpus.txt';

describe('SpellChecker', () => {
  let checker: SpellChecker;

  beforeEach(() => {
    checker = new SpellChecker();
  });

  it('should throw if corpus not initialized', () => {
    expect(() => checker.correctWord('word')).toThrow('Corpus need to be init');
    expect(() => checker.correctSentence('Some sentence')).toThrow('Corpus need to be init');
  });

  it('should load the corpus from file and correct known words', async () => {
    const checker = new SpellChecker();
    await checker.addFileCorpus(filePath);

    // assuming "woman" appears once and "sherlock" as well in test-corpus.txt
    expect(checker.correctWord('womam')).toBe('woman');
    expect(checker.correctWord('sherlok')).toBe('sherlock');
    expect(checker.correctWord('zzzz')).toBe('zzzz'); // unknown fallback
  });

  it('should correct a word using string corpus', () => {
    checker.addStringCorpus('cat dog mouse');

    expect(checker.correctWord('catt')).toBe('cat');
    expect(checker.correctWord('do')).toBe('dog');
    expect(checker.correctWord('muose')).toBe('mouse');
  });

  it('should correct a sentence and keep punctuation', () => {
    checker.addStringCorpus('hello world this is a test');

    const result = checker.correctSentence('hellp world. Thsi is a tset!');
    expect(result).toBe('hello world. this is a test!');
  });

  it('should ignore unknown words and return them as-is', () => {
    checker.addStringCorpus('cat dog');
    expect(checker.correctWord('xzyq')).toBe('xzyq');
    expect(checker.correctSentence('xzyq! dog.')).toBe('xzyq! dog.');
  });

  it('should return empty string if sentence is empty', () => {
    checker.addStringCorpus('some corpus');
    expect(checker.correctSentence('')).toBe('');
  });
});
