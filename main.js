const svgConvert = require('svg-to-dataurl')
const fs = require('fs');
const svg_data = fs.readFileSync(process.argv[2]);
const base64 = Buffer.from(svg_data).toString('base64');
const dataurl = "data:image/svg+xml;base64," + base64;
const encoded_dataurl = encodeURIComponent(dataurl)
console.log(encoded_dataurl);
