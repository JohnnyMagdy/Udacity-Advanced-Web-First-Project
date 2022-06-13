import { Resize } from '../../utilities/Sizer';

describe('Image transform function should resolve or reject', () => {
  const fileName = "assets/full/palmtunnel.jpg";
  const width = 200;
  const height = 200;

  it('Expect transform to not throw error', () => {
    expect(Resize(fileName, width, height)).toBeTruthy();
  });

  it('Expect transform to throw error', () => {
    expect(Resize('fileName', width, height)).toBeFalsy();
  });
});
