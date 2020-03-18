const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employeeArray = [];

// define array of questions for inquirer
const questionArray = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of employee is it?',
        choices: ["manager", "engineer", "intern"]
    },
    {
        type: 'input',
        name: 'name',
        message: 'what is the employees name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'what is the employees id?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'what is the employees email'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'what is the office number',
        when: (answers) => answers.type === "manager"
    },
    {
        type: 'input',
        name: 'school',
        message: 'what school does he or she attend?',
        when: (answers) => answers.type === "intern"
    },
    {
        type: 'input',
        name: 'github',
        message: 'what is the github username?',
        when: (answers) => answers.type === "engineer"
    },
    {
        type: 'confirm',
        name: 'add',
        message: 'would you like to add another employee?'
    },
]

initPrompt(questionArray);  // call inquirer

function initPrompt(questions){
    inquirer.prompt(questions).then(input => { 
        switch(input.type){ // check what kind of employee user inputted
            // add new employee of correct type to employeeArray
            case "manager":
                employeeArray.push(new Manager(input.name, input.id, input.email, input.officeNumber));
            break
            case "engineer":
                employeeArray.push(new Engineer(input.name, input.id, input.email, input.github));
            break
            case "intern":
                employeeArray.push(new Intern(input.name, input.id, input.email, input.school));
            break
            default:
                throw Error("something went wrong");
        }
        if(input.add){ //check if the user wants to add more employees
            initPrompt(questionArray); //start prompt sequence over
        }else{
            makeHTML(); 
        }
    });
}

// render an html file from employee array and write it to an output folder
function makeHTML(){
    let html = render(employeeArray);
    console.log("we ran makeHTML");
    if (fs.existsSync(OUTPUT_DIR)){
        console.log('found the directory');
        fs.writeFile(outputPath, html, err=>{
            if(err){
                console.log(err);
            }
        })
    } else{
        console.log('should have made a file');
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFile(outputPath, html, err=>{
            if(err){
                console.log(err);
            }
        })
    }
}