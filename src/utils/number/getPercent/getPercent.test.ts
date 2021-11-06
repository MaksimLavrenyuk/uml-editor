import getPercent from './index';

test('Interest testing.', () => {
    expect(getPercent(1641205783, 1839779512)).toBe(89.21);
    expect(getPercent(1641205783, 1839779512)).toBe(89.21);
    expect(getPercent(1641205783, 123)).toBe(1334313644.72);
    expect(getPercent(1641205783, 0)).toBe(null);
    expect(getPercent(0, 123)).toBe(0);
    expect(getPercent(11, 1234, 3)).toBe(0.891);
    expect(getPercent(11, 1234, -1)).toBe(null);
    expect(getPercent(11, 1234, 101)).toBe(null);
    expect(getPercent(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(100);
    expect(getPercent(100, Number.MAX_SAFE_INTEGER)).toBe(0);
    expect(getPercent(Number.MAX_SAFE_INTEGER, 123)).toBe(7322926223366659);
});
