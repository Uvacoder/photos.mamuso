import * as fs from 'fs';
import glob from 'glob';

const filePath = 'data/data.json';

let json = [];

const sortJson = (a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

fs.unlinkSync(filePath);
glob('data/export/**/*.json', (error, files) => {
  files.reverse().forEach((filename) => {
    const contents = JSON.parse(fs.readFileSync(filename, 'utf8'));
    json = json.concat(contents);
  });

  json.sort(sortJson);

  console.log(json);

  fs.writeFileSync(filePath, JSON.stringify(json));
});
