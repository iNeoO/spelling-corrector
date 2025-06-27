type Splits = [string, string][];
const letters = 'abcdefghijklmnopqrstuvwxyz';

export const splits = (word: string): Splits => {
  if (word === '') {
    return [];
  }
  return Array.from({ length: word.length + 1 }, (_, i) => [word.slice(0, i), word.slice(i)]);
};

export const deletes = (splits: Splits) =>
  splits.flatMap(([L, R]) => (R.length > 0 ? [L + R.slice(1)] : []));

export const transposes = (splits: Splits) =>
  splits.flatMap(([L, R]) => (R.length > 1 ? [L + R[1] + R[0] + R.slice(2)] : []));

export const replaces = (splits: Splits) =>
  splits.flatMap(([L, R]) =>
    R.length > 0 ? [...Array.from(letters, (c) => L + c + R.slice(1))] : [],
  );

export const inserts = (splits: Splits) =>
  splits.flatMap(([L, R]) => Array.from(letters, (c) => L + c + R));

export const edits1 = (word: string) => {
  const splitted = splits(word);
  return new Set([
    ...deletes(splitted),
    ...inserts(splitted),
    ...transposes(splitted),
    ...replaces(splitted),
  ]);
};

export const edits2 = (word: string) => {
  const edits1Set = edits1(word);
  return new Set(Array.from(edits1Set).flatMap((w) => Array.from(edits1(w))));
};
