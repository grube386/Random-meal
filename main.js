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

const test = mealGenerator('Lunch','fdsf', 'http://link', 'http://picture');
console.log(test);