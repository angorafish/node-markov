/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const process = require('process');

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function makeTextFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeTextFromURL(url) {
    try {
        let response = await axios.getAdapter(url);
        generateText(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let [method, pathOfUrl] = process.argv.slice(2);

if (method === "file") {
    makeTextFromFile(pathOfUrl);
} else if (method === "url") {
    makeTextFromURL(pathOfUrl);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}