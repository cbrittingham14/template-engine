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

initPrompt(questionArray);

function initPrompt(questions){
    inquirer.prompt(questions).then(input => {
        // console.log(input);
        switch(input.type){
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
                console.log("didnt get the question");
        }
        // console.log(employeeArray);
        if(input.add){
            initPrompt(questionArray);
        }else{
            makeHTML();
        }
    });
}

function makeHTML(){
    render(employeeArray);
    console.log("we ran makeHTML");
}

// questionCount = results.count;
// console.log("results, results.count", results, results.count);

// inquirer.prompt( {
//     type: 'number',
//     name: 'count',
//     message: 'How many employees do you have?'
// }).then(input => {
//     console.log(`employee count: ${input.count}`);
//     askQuestions(input.count);
// });

// function askQuestions(count){
//      questionCount = count;
//      console.log('qc: ', questionCount);
//     inquirer.prompt( {
//         type: 'list',
//         name: 'type',
//         message: 'What type of employee is it?',
//         choices: ["manager", "engineer", "intern"]
//     }).then(input => {
//         console.log(input.type);
//         if (questionCount> 0){
//             questionCount --;
//             console.log('question count: ', questionCount)
//             getQuestion(input.type);
//         } else{
//             return
//         }
//     });
// }

// function getQuestion(type){
//     switch(type){
//         case "manager":
//             initPrompt(managerQuestions);
//         break
//         case "engineer":
//             initPrompt(engineerQuestions);
//         break
//         case "intern":
//             initPrompt(internQuestions);
//         break
//         default:
//             console.log("didnt get the question");
//     }
// }