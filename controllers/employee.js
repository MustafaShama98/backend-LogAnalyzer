const fs = require('fs');
const {onSignupNewDatabase,switchDB,getDBModel} = require('../multiDatabaseHandler')
const employeeSchema = require('../models/employeeSchema.js')

async function getEmployeeDataByCompany(companyName) {
    // Switch to the specific database based on the company name
    const dbForCompany = await switchDB(companyName, 'employees', employeeSchema);

    if (!dbForCompany) {
        throw new Error(`Unable to switch to database for company: ${companyName}`);
    }

    // Use the dbForCompany to get the model
    const employeeModel = await getDBModel(dbForCompany, 'employees', employeeSchema);

    // Fetch all employees for that company
    const employees = await employeeModel.find({});

    return employees;
}

async function fetchEmployeesAndSaveToJSON(companyName) {
    const employeesForCompany = await getEmployeeDataByCompany(companyName);

    fs.writeFileSync('employees.json', JSON.stringify(employeesForCompany, null, 2));
}

const companyName = 'gmail'; // Replace with the desired company name
fetchEmployeesAndSaveToJSON(companyName)
    .then(() => {
        console.log('Employee data saved to employees.json');
    })
    .catch(error => {
        console.error('Error fetching employee data:', error);
    });