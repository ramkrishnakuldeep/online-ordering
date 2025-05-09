import { expect, test } from 'vitest'
import { getFormattedNumber } from '../utils/func'


test('get formatted number correctly with 2 decimals', () => {
    expect(getFormattedNumber(189)).toBe('189.00')
})

test('get formatted number correctly with 2 decimals', () => {
    expect(getFormattedNumber(29.6)).toBe('29.60')
})

test('get formatted number correctly with 2 decimals', () => {
    expect(getFormattedNumber(105469.5)).toBe('105,469.50')
})

test('get formatted number correctly with 2 decimals', () => {
    expect(getFormattedNumber(10335469.59989)).toBe('10,335,469.60')
})