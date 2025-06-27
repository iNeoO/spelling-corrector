import { candidates } from './candidates';
import { P } from './probability';

export const correction = (word: string, corpus: Map<string, number>, total: number) => {
  let max = -1;
  let correct = '';
  const wordCased = word.toLocaleLowerCase();
  [...candidates(wordCased, corpus)].forEach((w) => {
    const wordMax = P(w, corpus, total);
    if (wordMax > max) {
      correct = w;
      max = wordMax;
    }
  });

  return correct;
};
