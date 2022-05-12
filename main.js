const prompt = require('prompt-sync')({sigint: true});
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
let correct = false;
let strMealTypes = '';
mealTypes.forEach((el, index) => strMealTypes += `${index + 1} - ${el}\n`);
strMealTypes = strMealTypes.substring(0,strMealTypes.length - 1);


//starting up the program and selecting the meal type
console.log('Hello Matej, I see that you are hungry :)\n' +
    'What meal would you like to eat?\n' +
    strMealTypes)
//while loop so that the correct selection is made
do
{
    selectMealType(prompt("Input your selection: "));
} while (correct === false)

//checking if the correct input was done and select the meal type
function selectMealType(input) {
    correct = false;
    const maxRange = mealTypes.length;
    const number = Number(input.trim());
    //checks if the number is correct
    if (number >= 1 && number <= maxRange){
        correct = true;
        return mealTypes[number - 1];
    } else {
        console.log(`You need to enter a number between 1 and ${maxRange}.\n` +
        `Try again.`);
        correct = false;
    }
}

//creates a meals array of objects
const meals = csvStringToObjects(readCSV());

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

//creates a CSV compatible string from the objects in the array
function createCSV (meals) {
    let row = 0; //row being worked on
    let fullPropLen = 0; //full number of properties
    let objectArray; //array created from the object
    let csvString = '';
    for (const obj of meals ) {
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
        if (!rowData.includes(";")) return;
        const lineArray = rowData.split(';');
        //loop through all of the values in a row
        lineArray.forEach((entry, lineIndex) => {
            meal[headers[lineIndex]] = entry;
        })
        meals.push({...meal});
    })
    return meals;
}

//select a random object from an array
function selectRandomMeal(meals, type = "Lunch") {
    //create different arrays with no date, date, and by type
    const newMeals = meals.filter(meal => !meal.lastUsed && meal.type === type);
    const usedMeals = meals.filter(meal => meal.lastUsed && meal.type === type);
    //get the average date
    const usedDates = usedMeals.map(meal => Date.parse(meal.lastUsed)).sort();
    const averageDate = usedDates.reduce((prev, curr) => prev + curr) / usedDates.length;
    const thirdsDate = usedDates[Math.floor(usedDates.length/3) * 2];
    //get the non favorite and favorite meals older than the date
    const nonFavMeals = usedMeals.filter(meal => ((Date.parse(meal.lastUsed) <= averageDate)) && meal.favorite !== 'TRUE');
    const favMeals = usedMeals.filter(meal => ((Date.parse(meal.lastUsed) <= thirdsDate)) && meal.favorite === 'TRUE');
    //create a pool of all eligible meals (nonFav, fav, 3x new)
    const raffle = [...newMeals, ...nonFavMeals, ... newMeals, ...favMeals, ...newMeals]
    //select a random meal
    return raffle[Math.floor(Math.random() * raffle.length)];
}

//update the chosen meal with today's date
function updateMeals (meal) {
    //update the meals array
    const index = meals.findIndex(element => (element._num === meal._num && element.name === meal.name));
    const now = new Date(Date.now());
    const dateStr = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`;
    meals[index].lastUsed = dateStr;
    return meals;
}
