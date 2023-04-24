import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { normalizeDescription } from '../src/utils/normalizations';

describe('probando normalizations.js', () => {
  it('normalizedDescription', () => {
    expect(normalizeDescription("toyota rojo cuatro puertas", 10)).toBe("toyota roj...");
  });

  it('normalizedDescription', () => {
    expect(normalizeDescription("toyota", 10)).toBe("toyota");
  });
});

