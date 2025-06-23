# 🧠 Norvig Spelling Corrector — TypeScript Implementation

This repository is an experimental implementation of the classic [Peter Norvig spell checker algorithm](https://norvig.com/spell-correct.html), rewritten in TypeScript.

The goal is to explore how the core ideas of this algorithm (used in real-world spelling correction systems) can be expressed clearly and efficiently in a modern typed JavaScript environment.

## ✨ Features

- Pure functional logic with immutable structures
- Core edit distance 1 transformations:
  - Deletion
  - Transposition
  - Replacement
  - Insertion
- Fully typed and testable
- TDD-friendly with [Vitest](https://vitest.dev)

## 📁 Structure

core/
edits.ts // edit distance functions (splits, deletes, etc.)
corpus.ts // word frequency dictionary (planned)
correction.ts // main correction function (planned)

tests/
edits.test.ts // unit tests for edits

## 🚀 Getting Started

Install dependencies:

```bash
pnpm install
```

Run dev:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

## 🧪 Tech Stack

TypeScript
Vitest (unit tests)
Node.js (runtime)

📚 References
[Norvig's original blog post](https://norvig.com/spell-correct.html)

