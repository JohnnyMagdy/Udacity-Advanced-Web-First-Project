import express from 'express';
import path from 'path';
import fs from "fs";

import { Resize } from '../../utilities/Sizer';

const images = express();
const port: number = 3000;
const imagesSrcFolder: string = 'assets/full/';
const imagesDestFolder: string = 'assets/thumb/';
let dir:string = path.join(__dirname,"/../../../assets");

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

images.get('/', (req: express.Request, res: express.Response) => {

    if (req.query.filename == undefined) {
        res.send("You need to specify filename");
        return;
    }

    if (req.query.width == undefined) {
        res.send("You need to specify a width");
        return;
    }

    if (req.query.height == undefined) {
        res.send("You need to specify a height");
        return;
    }

    let imgName: string = req.query.filename + '.jpg';

    let width: number = Number(req.query.width);
    let height: number = Number(req.query.height);

    let dimentions = "_" + width + "x" + height;

    const imgDestName: string = req.query.filename + '_thumb' + dimentions + '.jpg'

    const baseUrl: string = 'http://localhost:3000';
    latestUrl = baseUrl + req.originalUrl;

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }else{
        //console.log(dir+" exists");
    }
    
    dir = path.join(dir,"/full");
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }else{
        //console.log(dir+" exists");
    }

    dir = path.join(dir,"/../thumb");
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }else{
        //console.log(dir+" exists");
    }

    if (fs.existsSync(imagesDestFolder + imgDestName)) { // If Cached by file name and size
        console.log("We didn't resize");
        res.sendFile(imgDestName, options, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:', imgDestName);
            }
        });
    } else {
        if (fs.existsSync(imagesSrcFolder + imgName)) { // Not Cached and OG Exists
            const image = Resize(imagesSrcFolder + imgName, width, height);

            image.toFile(imagesDestFolder + imgDestName)
                .then(() => {
                    res.sendFile(imgDestName, options, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Sent:', imgDestName);
                        }
                    });
                });
        } else { // Dose Not Exist
            res.send("The file dosen't exits");
        }
    }
});

export default images;
