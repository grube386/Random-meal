const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

//This wil generate a new object and add it to the txt file
function mealGenerator(type, name, link, picture) {
    //checks that all of the inputs are strings
    let breaker = false; //variable to check if the function needs to break
    for (let i = 0; i < arguments.length; i++){
        if (!(typeof(arguments[i]) === 'string')){
            console.log(arguments[i] + ' is not a string.\n' +
            'Please insert only strings');
            breaker = true;
        }
    }
    if (breaker){return}
    //check if type is applicable
    if (!mealTypes.some(e => e === type)){
        console.log('The selected meal type is not correct, input one of the following: ');
        for (type of mealTypes) {
            console.log(`- ${type}`);
        }
        return;
    }

    //check if link and picture start with http
    if (!link.startsWith('http')) {
        console.log('The link doesn\'t seem to be a valid URL');
        return;
    }
    if (!picture.startsWith('http')) {
        console.log('The picture link doesn\'t seem to be a valid URL');
        return;
    }

    //create an object
    return  {
        _num:'',
        name,
        type,
        link,
        picture,
        recipe: '',
        lastUsed: ''
    }

}

//two test meals being generated
const test1 = mealGenerator("Lunch","fdsf", "http://link", "http://picture");
const test2 = mealGenerator("Breakfast","something", "http://link2", "http://picture3");

//test array with two meals
const testArr = [test1, test2];

//creates a CSV compatible string from the objects in the array
function createCSV (arr) {
    let row = 0; //row being worked on
    let fullPropLen = 0; //full number of properties
    let objectArray; //array created from the object
    let csvString = '';
    for (const obj of arr ) {
        objectArray = Object.entries(obj); //assign value
        fullPropLen = objectArray.length; //assign value
        let currPropNum = 0; //property being written down at the moment
        let headerStr = '';
        let valueStr = '';
        //loop through the object
        for (const [key, value] of objectArray) {
            if (row === 0) { //for the first row it creates headers and adds values
                headerStr += key;
                headerStr += currPropNum + 1 < fullPropLen ? ';' : '\n'; //adds a semicolon or new line to the string depending on which property is written
                valueStr += value;
                valueStr += currPropNum + 1 < fullPropLen ? ';' : '\n'; //adds a semicolon or new line to the string depending on which property is written
                currPropNum++;
            } else {
                csvString += value; //adds the key to the string
                csvString += currPropNum + 1 < fullPropLen ? ';' : '\n' //adds a semicolon or new line to the string depending on which property is written
                headerStr = '';
                currPropNum++;
            }
        }
        csvString += headerStr + valueStr; //adds the created strings to the csvString
        row++; //goes to the next row
    }
    return csvString;
}

//saves the string to a CSV file
function saveCsvToFile (string) {
    const fs = require('fs');
    try {
        fs.writeFileSync('meals.csv', string, "utf-8");
        console.log('File written.')
    } catch (err) {
        console.error(err);
    }

}

//reads from the CSV file
function readCSV () {
    const fs = require('fs');
    let string = '';
    try {
        string = fs.readFileSync('meals.csv', "utf-8");
    } catch (err) {
        console.error(err);
    }
    //remove \r if included
    string = string.replaceAll('\r', '');
    return string;
}

//convert CSVstring  to an array of objects
function csvStringToObjects (string) {
    //split string into rows using \n
    const meals = [];
    const meal = {};
    const allRows = string.split('\n');
    //checks that there is at least one entry in the csv + headers
    if (allRows.length < 2) return console.log('There is not enough data in the file.')
    //creates a header array
    const headers = allRows[0].split(';');
    //loops through the res of the rows
    allRows.forEach((rowData, rowIndex) => {
        if (rowIndex === 0) return;
        const lineArray = rowData.split(';');
        //loop through all of the values in a row
        lineArray.forEach((entry, lineIndex) => {
            meal[headers[lineIndex]] = entry;
        })
        meals.push(meal);
    })
    return meals;
}


const string = readCSV();
console.log(csvStringToObjects(string));
let dsfas = 1;