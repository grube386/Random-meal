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
    fs.writeFile('meals.csv', string, "utf-8", function (err){
        if (err) return console.log(err);
        console.log("File written");
    });
}

saveCsvToFile(createCSV(testArr));