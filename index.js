const inquirer = require('inquirer');
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


let promptUser = () => {
    
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of your project?",
                name: "title"
            },
            {
                type: "input",
                message: "Please provide a description of the project.",
                name: "description"
            },
            {
                type: "checkbox",
                message: "Select what you would like to be included in your table of contents.",
                choices: ["Installation", "Usage", "Credits"],
                name: "content"
            },
            {
                type: "input",
                message: "Provide installation instructions for how to get your project working on your local machine.",
                name: "installation"
            },
            {
                type: "input",
                message: "How will this project be used?",
                name: "usage"
            },
            {
                type: "list",
                message: "Select the License you would like to use.",
                choices: ["Apache License v2 ![Apache License](https://img.shields.io/badge/license-Apache-blue)", "GNU General Public License v3 ![GNU General Public License](https://shields.io/badge/license-GPL%20(%3E%3D%202)-blue)", "MIT License ![MIT License](https://img.shields.io/badge/license-MIT-green)"],
                name: "license"
            },
            {
                type: "input",
                message: "Who contributed to this project?",
                name: "contributers"
            },
            {
                type: "input",
                message: "Write any test you would like to be performed on your application here",
                name: "tests"
            },
            {
                type: "input",
                message: "What are some questions you would like to pose to the user?",
                name: "questions"
            }
        ]);
}

let generateREADME = (answers) => {

    let returnContent = () => {
        for (let i = 0; i < answers.content.length; i++) {
            return `* [${answers.content[i]}](#${answers.content[i].toLowerCase()})`
        }
    }
    return `# ${answers.title}

${answers.license}

## Project Description
${answers.description}

## Table of Contents
${returnContent()}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributers
${answers.contributers}

## Tests
${answers.tests}

## Questions
${answers.questions}`;
}

async function init() {
    console.log("test")
    try {
        const answers = await promptUser();

        const markDown = generateREADME(answers);

        await writeFileAsync("README.md", markDown);

        console.log("Successfully wrote to README.md");
    } catch(err) {
        console.log(err);
    }
}

init()