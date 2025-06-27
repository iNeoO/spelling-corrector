export const N = (corpus: Map<string, number>) =>
  Array.from(corpus.values()).reduce((a, b) => a + b, 0);

export const P = (word: string, corpus: Map<string, number>, N: number) => {
  return (corpus.get(word) ?? 0) / N;
};
