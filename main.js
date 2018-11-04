const svgConvert = require('svg-to-dataurl')
const ArgumentParser = require('argparse').ArgumentParser
const fs = require('fs');

const { execSync } = require("child_process")

function main() {
    let parser = getParser();
    let args = parser.parseArgs();
    generateBadge(args.text, args.label, args.status, args.logo, args.colorA, args.color, args.output);
}

function getParser() {
    var parser = new ArgumentParser({});
    parser.addArgument([ '-t', '--text' ], {
        dest: 'text',
        defaultValue: ''
    });
    parser.addArgument([ '-l', '--left', '--label' ], {
        dest: 'label',
        defaultValue: ''
    });
    parser.addArgument([ '-r', '--right', '--status' ], {
        dest: 'status',
        defaultValue: ''
    });
    parser.addArgument([ '-i', '--img', '--logo' ], {
        dest: 'logo'
    });
    parser.addArgument([ '-c', '--color'], {
        dest: 'color',
        defaultValue: 'nocolor'
    });
    parser.addArgument(['--colorA'], {
        dest: 'colorA',
        defaultValue: ''
    })
    parser.addArgument([ '-o', '--output'], {
        dest: 'output',
        defaultValue: Date.now()
    });
    return parser;
}

function generateLogo(logo_fp) {
    const svg_data = fs.readFileSync(logo_fp);
    const base64 = Buffer.from(svg_data).toString('base64');
    const dataurl = "data:image/svg+xml;base64," + base64;
    const encoded_dataurl = encodeURIComponent(dataurl)
    return encoded_dataurl;
}

function generateBadge(text, label, status, logo_fp, colorA, color, output) {
    let logo = '';
    if(logo_fp !== null) {
        logo = generateLogo(logo_fp);
    }
    let filename = `${status}-${color}.svg`;
    if(label == "") {
        filename = text + "-" + filename;
    }
    let shieldsio_url = "https://img.shields.io/badge/" +
        filename +
        `?logo=${logo}` +
        `&label=${label}` +
        `&colorA=${colorA}`;

    console.log(shieldsio_url);
    execSync("wget '" + shieldsio_url + `' -O output/${output}.svg`);
}

main();
