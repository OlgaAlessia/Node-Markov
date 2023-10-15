/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require("./markov");

//let mm = new MarkovMachine("the cat in the hat");


function generateText(text){
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}


function mmReadFile(pathFile){
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${pathFile}: ${err}`);
            process.kill(1)
        }
        generateText(data);
    })
}

async function mmReadUrl(URL){
    try{
        const response = await axios.get(URL);
        generateText(response.data);

    } catch (error) {
        console.error(`Error fetching ${URL}: ${error}`);
        process.exit(1);
    }
}


//$node makeText.js file eggs.txt
//$node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
if (process.argv[2] == "file"){
    mmReadFile(process.argv[3]);
} else if (process.argv[2] == "url"){
    mmReadUrl(process.argv[3]);
}
else {
    console.error(`Method not fount: ${process.argv[2]}`);
    process.exit(1);
}
