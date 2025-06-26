import { createReadStream } from 'node:fs';

export async function* getWordsFromFile(path: string): AsyncGenerator<string[]> {
  const stream = createReadStream(path, { encoding: 'utf-8', highWaterMark: 4096 });

  for await (const chunk of stream) {
    yield chunk.toLowerCase().match(/\w+/g) ?? [];
  }
}

export const buildWordFreq = async (path: string): Promise<Map<string, number>> => {
  const wordMap = new Map<string, number>();

  for await (const words of getWordsFromFile(path)) {
    for (const word of words) {
      wordMap.set(word, (wordMap.get(word) ?? 0) + 1);
    }
  }

  return wordMap;
};
