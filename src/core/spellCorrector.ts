import { correction } from './correction';
import { N } from './probability';
import { buildWordFreqFromFile, buildWordFreqString } from './word';

export class SpellCorrector {
  private corpus: Map<string, number> | null;
  private total: number;

  constructor() {
    this.corpus = null;
    this.total = 0;
  }

  private handleCorpusNotSet(): never {
    throw new Error('Corpus need to be init');
  }

  public async addFileCorpus(path: string) {
    this.corpus = await buildWordFreqFromFile(path);
    this.total = N(this.corpus);
  }

  public addStringCorpus(words: string) {
    this.corpus = buildWordFreqString(words);
    this.total = N(this.corpus);
  }

  public correctWord(word: string) {
    if (this.corpus === null) {
      this.handleCorpusNotSet();
    }
    return correction(word, this.corpus, this.total);
  }

  public correctSentence(sentence: string) {
    const tokens = sentence.match(/\w+|\W+/g) ?? [];
    return tokens
      .map((token) => {
        if (/^\w+$/.test(token)) {
          if (this.corpus === null) {
            this.handleCorpusNotSet();
          }
          return correction(token, this.corpus, this.total);
        }
        return token;
      })
      .join('');
  }
}
