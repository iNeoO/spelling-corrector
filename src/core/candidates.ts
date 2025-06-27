import { edits1, edits2 } from './edits';

export const known = (words: Set<string>, corpus: Map<string, number>) =>
  new Set([...words].filter((word) => corpus.has(word)));

export const candidates = (word: string, corpus: Map<string, number>) => {
  const direct = known(new Set([word]), corpus);
  if (direct.size > 0) return direct;

  const edits1Set = known(edits1(word), corpus);
  if (edits1Set.size > 0) return edits1Set;

  const edits2Set = known(edits2(word), corpus);
  if (edits2Set.size > 0) return edits2Set;

  return new Set([word]);
};
