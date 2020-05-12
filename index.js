
// import fs package for reading and writing files
var fs = require("fs");
// import inquirer for accepting user input
var inquirer = require("inquirer");
// import api file
const api = require("./utils/api");
// import badge-maker for license badges
var badgeMaker = require("badge-maker");
//import generateMarkdown file
const generateMarkdown = require("./utils/generateMarkdown");

var readmeInfo = {
    username: "",
    email: "",
    projectName: "",
    projectDescription: "",
    license: "",
    dependencies:"",
    tests: "",
    usage: "",
    contribute: "",
    gitImage: "",
    badge: []
  };

inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
    {
      type: "input",
      name: "projectName",
      message: "What is your project's name?"
    },
    {
      type: "input",
      name: "projectDescription",
      message: "Description of your project."
    },
    {
      type: "checkbox",
      name: "license",
      message: "What kind of license should your project have?",
      choices: [
        "MIT", 
        "Apache 2.0", 
        "GPL 3.0", 
        "BSD 3",
        "None"
      ]
    },
    {
        type: "input",
        name: "dependencies",
        message: "What command should be run to install dependencies?",
        default: "npm install"
    },
    {
        type: "input",
        name: "tests",
        message: "What command should be run to run tests?",
        default: "npm run test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
    },
    {
        type: "input",
        name: "contribute",
        message: "What does the user need to know about contributing to the repo?"
    }
    
  ]).then(function(data) {
    console.log(data);
    const queryUrl = `https://api.github.com/users/${data.username}`;

    var apiPromise = new Promise((resolve, reject) => {
        api.getUser(queryUrl)
        .then(function (apiResponse){
            readmeInfo.username = data.username;
            readmeInfo.email = data.email;
            readmeInfo.projectName = data.projectName;
            readmeInfo.projectDescription = data.projectDescription;
            readmeInfo.license = data.license;
            readmeInfo.dependencies = data.dependencies;
            readmeInfo.tests = data.tests;
            readmeInfo.usage = data.usage;
            readmeInfo.contribute = data.contribute;
            readmeInfo.gitImage = apiResponse.data.avatar_url;

            resolve(readmeInfo);
        })
        .catch(function(err) {
            throw err;
        })
    });

    return apiPromise;
  })

    .then(function(readmeInfo){
        console.log(readmeInfo.license);
        var color;
        //set badge based on user input
        for (i = 0; i < readmeInfo.license.length; i++) {
            
            switch(readmeInfo.license[i]) {
                case "MIT":
                color = "red";
                break;
                case "Apache 2.0":
                color = "blue";
                break;
                case "GPL 3.0":
                color = "brightgreen";
                break;
                case "BSD 3":
                color = "orange";
                break;
                default:
                color = "inactive"
            }

            readmeInfo.badge.push("https://img.shields.io/badge/License-" + readmeInfo.license[i].replace(" ","") + "-" + color);
        }

        return readmeInfo;

        console.log(readmeInfo);

    })
  
  .then(function(readmeInfo) {
    fs.writeFile("readme.md", generateMarkdown(readmeInfo), function(err){
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
  })

.catch(function(err) {
    console.log(err);
});
