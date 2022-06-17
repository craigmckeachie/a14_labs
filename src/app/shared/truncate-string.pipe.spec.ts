import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateStringPipe', () => {
  const pipe = new TruncateStringPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate string', () => {
    expect(pipe.transform('abcd', 3)).toEqual('abc...');
  });

  it('should not truncate string', () => {
    expect(pipe.transform('ab', 3)).toEqual('ab');
  });
});
