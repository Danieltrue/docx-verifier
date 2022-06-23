import {moveFile} from 'move-file';
import officeparser from 'officeparser';
import fs from 'fs';
import WordExtractor from 'word-extractor';
const extractor = new WordExtractor();
let valid = 0;
let corrupt = 0;

let filesToBeExtracted;

fs.readdir('./docx',(err,files) => {

  files.forEach(async (file, index) => {
      await verifyFile(file);
  });

  console.log({valid,corrupt})

});


function verifyFile(file) {
  const ext = extractor.extract(`./docx/${file}`);
  ext.then(async(docs) => {
    if (docs) {
      await moveFile(`./docx/${file}`,`./valid/${file}`);
      console.log('Moved Valid')
      valid += 1;
    }
  }).catch(async (error) => {
    if (error) {
      await moveFile(`./docx/${file}`,`./corrupt/${file}`);
      console.log('Moved Corrupt');
      corrupt += 1;
    }
  })
}
