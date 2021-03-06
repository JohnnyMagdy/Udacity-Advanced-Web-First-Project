import express from 'express';
import path from 'path';
import fs from 'fs';

import { Resize } from '../../utilities/Sizer';

const images = express();
const imagesSrcFolder = 'assets/full/';
const imagesDestFolder = 'assets/thumb/';
let dir = path.join(__dirname, '/../../../assets');

const options = {
  root: path.join(__dirname, '/../../../assets/thumb'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

images.get('/', (req: express.Request, res: express.Response) => {
  if (req.query.filename == undefined) {
    res.send('You need to specify filename');
    return;
  }

  if (req.query.width == undefined) {
    res.send('You need to specify a width');
    return;
  } else {
    if (isNaN(Number(req.query.width))) {
      res.send('Width should be a number');
    } else {
      if (Number(req.query.width) <= 0) res.send('Width should be positive number');
    }
  }

  if (req.query.height == undefined) {
    res.send('You need to specify a height');
    return;
  } else {
    if (isNaN(Number(req.query.height))) {
      res.send('Height should be a number');
    } else {
      if (Number(req.query.height) <= 0) res.send('Height should be positive number');
    }
  }

  const imgName: string = req.query.filename + '.jpg';

  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const dimentions = '_' + width + 'x' + height;

  const imgDestName: string =
    req.query.filename + '_thumb' + dimentions + '.jpg';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    //console.log(dir+" exists");
  }

  dir = path.join(dir, '/full');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    //console.log(dir+" exists");
  }

  // dir dosent work on /thumb but works on /../thumb when i run the app because i change the dir variable in line 61
  dir = path.join(dir, '/../thumb');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else {
    //console.log(dir+" exists");
  }

  if (fs.existsSync(imagesDestFolder + imgDestName)) {
    // If Cached by file name and size
    console.log("We didn't resize");
    res.sendFile(imgDestName, options, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Sent:', imgDestName);
      }
    });
  } else {
    if (fs.existsSync(imagesSrcFolder + imgName)) {
      // Not Cached and OG Exists
      const image = Resize(imagesSrcFolder + imgName, width, height);

      image.toFile(imagesDestFolder + imgDestName).then(() => {
        res.sendFile(imgDestName, options, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Sent:', imgDestName);
          }
        });
      });
    } else {
      // Dose Not Exist
      res.send("The file dosen't exits");
    }
  }
});

export default images;
