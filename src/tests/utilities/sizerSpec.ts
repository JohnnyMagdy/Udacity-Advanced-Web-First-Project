import sharp from 'sharp';
import { Resize } from '../../utilities/Sizer';

describe('Image transform function should resolve or reject', () => {
  const imgPath = "assets/full/palmtunnel.jpg";
  const outputPath = "assets/thumb/palmtunnel_thumb_200x200.jpg";
  const width = 200;
  const height = 200;

  it('Expect transform to not throw error', () => {
    let errExists = false;
    const img: sharp.Sharp = Resize(imgPath, width, height).toFile(outputPath, function (err) {
      if (err) {
        errExists = true;
      }
      expect(errExists).toBeFalse();
    });
  });

  it('Expect transform to throw error', () => {
    let errExists = false;
    const img: sharp.Sharp = Resize('imgPath', width, height).toFile(outputPath, function (err) {
      if (err) {
        errExists = true;
      }
      expect(errExists).toBeTrue();
    });
  });
});
