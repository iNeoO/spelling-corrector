type Splits = [string, string][];
const letters = 'abcdefghijklmnopqrstuvwxyz';

export const splits = (word: string) => {
  const splitted: Splits = [];
  if (word === '') {
    return [];
  }
  for (let i = 0; i < word.length + 1; i += 1) {
    splitted.push([word.slice(0, i), word.slice(i, word.length)]);
  }
  return splitted;
};

export const deletes = (splits: Splits) => {
  const newSplits: string[] = [];
  for (let i = 0; i < splits.length - 1; i += 1) {
    newSplits.push(splits[i][0] + splits[i][1].slice(1, splits[i][1].length));
  }
  return newSplits;
};

export const transposes = (splits: Splits) => {
  const newSplits: string[] = [];
  for (let i = 0; i < splits.length; i += 1) {
    if (splits[i][1].length <= 1) {
      return newSplits;
    }
    newSplits.push(
      splits[i][0] +
        splits[i][1].charAt(1) +
        splits[i][1].charAt(0) +
        splits[i][1].slice(2, splits[i][1].length),
    );
  }
  return newSplits;
};

export const replaces = (splits: Splits) => {
  const newSplits: string[] = [];
  for (let i = 0; i < splits.length; i += 1) {
    for (let j = 0; j < letters.length; j += 1) {
      newSplits.push(splits[i][0] + letters[j] + splits[i][1].slice(1, splits[i][1].length));
    }
  }
  return newSplits;
};

export const inserts = (splits: Splits) => {
  const newSplits: string[] = [];
  for (let i = 0; i < splits.length; i += 1) {
    for (let j = 0; j < letters.length; j += 1) {
      newSplits.push(splits[i][0] + letters[j] + splits[i][1]);
    }
  }
  return newSplits;
};
