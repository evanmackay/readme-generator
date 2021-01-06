const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const generate = require('./utils/generateMarkdown');

function init() {
    const question = [
        {
            type: 'input',
            name: 'title',
            message: 'What is your project title?'
        },
        {
            type: 'input',
            name: 'badge',
            message: 'Please provide the links to the badges you would like your project to have.'
        },
        {
            type: 'input',
            name: 'description',
            message: 'How would you describe your project?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please provide installation instructions for your application.'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How will your application be used?'
        },
        {
            type: 'input',
            name: 'license',
            message: 'Write or paste the license agreement you would like to use.'
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Who contributed to this project?'
        },
        {
            type: 'input',
            name: 'test',
            message: 'Provide any project tests you have completed.'
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your Github username?'
        },
        {
            type: 'input',
            name: 'repo',
            message: 'Please provide a link to the repository for the project.'
        }
    ]
    
    inquirer
        .prompt(question)
        .then(data => {
            const queryURL = `https://api.github.com/users/${data.username}`;
    
            axios.get(queryURL).then(res => {
                const githubInfo = {
                    githubImage: res.data.avatar_url,
                    email: res.data.email,
                    profile: res.data.html_url,
                    name: res.data.name
                }
    
                fs.writeFile('README.md', generate(data, githubInfo), err => {
                    if (err) {
                        throw err;
                    }
    
                    console.log('New README file has been created!')
                })
            })
        })
}
 init();