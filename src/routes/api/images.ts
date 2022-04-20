import express from 'express';
import sharp from 'sharp';
import path from 'path';

const images = express();
const port: number = 3000;
const imagesSrcFolder: string = 'assets/full/';
const imagesDestFolder: string = 'assets/thumb/';

let starterUrl: string = '';
let latestUrl: string = '';

const options = {
    root: path.join(__dirname, '/../../../assets/thumb'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
}

images.get('/', async (req: express.Request, res: express.Response) => {
    const imgName: string = req.query.filename + '.jpg';
    const imgDistName: string = req.query.filename + '_thumb.jpg'

    const width: number = Number(req.query.width);
    const height: number = Number(req.query.height);

    const baseUrl: string = 'http://localhost:3000';
    latestUrl = baseUrl + req.originalUrl;

    if (starterUrl !== null && starterUrl === latestUrl) {
        console.log("Ready");
        res.sendFile(imgDistName, options, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:', imgDistName);
            }
        });
    } else {
        console.log("Not ready");
        starterUrl = latestUrl;
        if (imgName === undefined || width === NaN || height == NaN) {
            res.send("You need to specify filename, width and height parameters to the query link");
        } else {
            await sharp(imagesSrcFolder + imgName)
                .resize(width, height)
                .toFile(imagesDestFolder + imgDistName, async (err, info) => {
                    if (err) console.log(err);
                    console.log(info);

                    await res.sendFile(imgDistName, options, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Sent:', imgDistName);
                        }
                    });
                });
        }
    }
});

export default images;
