const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

//This wil generate a new object and add it to the txt file
function mealGenerator(type, name, link, picture) {
    //checks that all of the inputs are strings
    let breaker = false;
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

    return {
        _num:'',
        name,
        type,
        link,
        picture,
        recipe: '',
        lastUsed: ''
    }

}

const test = mealGenerator('Breakfastgit',42, 'fdasf', 'fd');
console.log(test);