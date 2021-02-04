import { distanceInWordsToNow } from './dateHelpers';

describe('distanceInWordsToNow', () => {
  it('should returns `less than a minute`', () => {
    const expected = 'less than a minute';
    expect(distanceInWordsToNow()).toBe(expected);
  });
  it('should returns `about 6 years`', () => {
    const expected = 'about 6 years';
    const date = new Date(2015, 0, 1, 0, 0, 15);
    expect(distanceInWordsToNow(date)).toBe(expected);
  });
  it('should returns `2 minutes`', () => {
    const expected = '2 minutes';
    const now = Date.now();
    const twoMins = 120000;
    const date = new Date(now + twoMins);
    expect(distanceInWordsToNow(date)).toBe(expected);
  });
});
