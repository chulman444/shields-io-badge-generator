const svgConvert = require('svg-to-dataurl')
const fs = require('fs');
const svg_data = fs.readFileSync(process.argv[2]);
const base64 = Buffer.from(svg_data).toString('base64');
const dataurl = "data:image/svg+xml;base64," + base64;
const encoded_dataurl = encodeURIComponent(dataurl)
const { execSync } = require("child_process")

function generateBadge(logo) {
    let status = "r";
    let color = "red";
    const shieldsio_url = "https://img.shields.io/badge/" +
        `subject-${status}-${color}.svg?` +
        `logo=${logo}`

    console.log(shieldsio_url);
    execSync("wget " + shieldsio_url + " -O output/output.svg");
}

generateBadge(encoded_dataurl);
