import sharp from "sharp";

export async function Resize(imgPath: string, width: number, height: number): Promise<sharp.Sharp> {
    
    console.log("Image Resized");

    return await sharp(imgPath).resize(width, height);
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
