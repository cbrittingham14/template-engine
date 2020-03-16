// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber
    }
}
    

Manager.prototype.getRole = function(){
    return "Manager";
}
Manager.prototype.getOfficeNumber = function(){
    return this.officeNumber;
}
var man = new Manager("foo", 1, "jeremiah@jerome", 101);
console.log(man.office);
console.log(man.getOfficeNumber());

module.exports = Manager;