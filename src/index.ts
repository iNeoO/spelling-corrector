import { deletes, inserts, replaces, splits, transposes } from './core/edits';

const splitted = splits('anticonstitutionnellement');
new Set([
  ...deletes(splitted),
  ...inserts(splitted),
  ...transposes(splitted),
  ...replaces(splitted),
]);
