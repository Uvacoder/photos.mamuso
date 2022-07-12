// -----------------------------------------------------------
// Dependencies
import * as fs from 'fs';
import path from 'path';
import { getPaletteFromURL } from 'color-thief-node';
import fastExif from 'fast-exif';
import sharp from 'sharp';

// -----------------------------------------------------------
// Folder with original images
const imageFolder = './public/images/';
const thumbFolder = './public/thumbs/';
const dataFolder = './data/';

// -----------------------------------------------------------

(async () => {
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(async (file) => {
      const basename = path.basename(file, path.extname(file));
      if (!fs.existsSync(`${dataFolder}${basename}.json`) && path.extname(file).toLowerCase() === '.jpg') {
        const targetImage = `${imageFolder}${file}`;

        // Get Color palette from image
        const palette = await getPaletteFromURL(targetImage);
        const hexPalette = palette.map(
          (color) => '#' + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1)
        );

        // Get EXIF data from image
        const exif = await fastExif.read(targetImage);

        // Compose objedt to save in JSON file
        const exifSelection = {
          title: '',
          fileName: file,
          date: new Date(exif.exif.DateTimeOriginal).toDateString(),
          camera: `${exif.image.Make} ${exif.image.Model}`,
          iso: exif.exif.ISO,
          fnumber: exif.exif.FNumber,
          exposureBiasValue: Math.round(exif.exif.ExposureBiasValue * 10) / 10,
          exposureTime: `1/${Math.round(1 / exif.exif.ExposureTime)}`,
          GPSLatitude: (
            exif.gps.GPSLatitude[0] +
            exif.gps.GPSLatitude[1] / 60 +
            exif.gps.GPSLatitude[2] / 3600
          ).toFixed(6),
          GPSLongitude: (
            exif.gps.GPSLongitude[0] +
            exif.gps.GPSLongitude[1] / 60 +
            exif.gps.GPSLongitude[2] / 3600
          ).toFixed(6),
          colorPalette: hexPalette
        };

        // Resize image to thumbnail
        const sharpImage = sharp(targetImage);

        sharpImage.resize(4096, 4096, { fit: 'inside' }).toFile(`${thumbFolder}${basename}_4096.jpg`);
        sharpImage.resize(3072, 3072, { fit: 'inside' }).toFile(`${thumbFolder}${basename}_3072.jpg`);
        sharpImage.resize(2048, 2048, { fit: 'inside' }).toFile(`${thumbFolder}${basename}_2048.jpg`);
        sharpImage.resize(1024, 1024, { fit: 'inside' }).toFile(`${thumbFolder}${basename}_1024.jpg`);

        // Save JSON file
        fs.writeFile(`${dataFolder}${basename}.json`, JSON.stringify(exifSelection), (err) => {
          if (err) throw err;
          console.log(`${basename} saved!`);
        });
      }
    });
  });
})();
