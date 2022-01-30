const { ocrSpace } = require('ocr-space-api-wrapper');
const sharp = require('sharp');
const fs = require('fs').promises;

function parseTextAsPlain(text) {
  // parse response from OCR, grabbing all lines most likely to be time
  let letters = [];
  let numbers = [];
  for (let line of text.split("\n")) {
    line = line.toLowerCase();

    if (/[a-z]/g.test(line)) {
      if (!(line.includes('am') || line.includes('pm'))) continue;
      letters.push(line);
    } else {
      const number = line.match(/\d+/g);
      if (number < 100) continue;
      if (number > 1259) continue;
      numbers.push(number);
    }
  }

  console.log('LETTERS:')
  console.log(letters.join('\n'))

  console.log()

  console.log('NUMBERS:')
  console.log(numbers.join('\n'))
}

function parseTextAsTable(text) {
  console.log(text);
}

(async () => {
  // const res3 = await ocrSpace('data:image/png;base64...', { apiKey: '<API_KEY_HERE>', language: 'ita' });
  const image = sharp('samples/sample1.png')
    .rotate()
    .gamma()
    .greyscale()
    .toColorspace('b-w')
    .resize(1000);

  // TODO :: rotate image to have table exactly lined up

  // make base64 string
  const buffer = await image.clone().toBuffer();
  const base64 = `data:image/png;base64,${buffer.toString('base64')}`;

  // write modified image to output file
  const base64Image = base64.split(';base64,').pop();
  await fs.writeFile('out.png', base64Image, { encoding: 'base64' });

  // using the OCR.space default free API key (max 10reqs in 10mins) + local file
  const res = (await ocrSpace(base64, { isOverlayRequired: true, isTable: true })
      .catch(err => console.error(err))
    )
    .ParsedResults[0];

  // console.log(res);

  // parseTextAsPlain(res.ParsedText); // requires isTable: false
  parseTextAsTable(res.ParsedText);
})();
