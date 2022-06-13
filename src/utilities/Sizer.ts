import sharp from 'sharp';

export function Resize(imgPath: string, width: number, height: number): sharp.Sharp {
  console.log('Image Resized');

  return sharp(imgPath).resize(width, height);
}

// interface size {
//     width: number | undefined,
//     height: number | undefined
// }

// This dosen't work on cached images
// export async function getImageSize(imgPath: string): Promise<size> {
//     const metadata = sharp(imgPath).metadata();
//     return { width: (await metadata).width, height: (await metadata).height };
// }
