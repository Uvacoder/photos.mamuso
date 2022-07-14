import * as fs from 'fs';
import glob from 'glob';

const filePath = 'data/data.json';

let json = [];

fs.unlinkSync(filePath);
glob('data/export/**/*.json', (error, files) => {
  files.reverse().forEach((filename) => {
    const contents = JSON.parse(fs.readFileSync(filename, 'utf8'));
    json = json.concat(contents);
  });
  console.log(json);
  fs.writeFileSync(filePath, JSON.stringify(json));
});
