const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

//This wil generate a new object and add it to the txt file
function mealGenerator(type, name, link, picture) {
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

const test = mealGenerator('Breakfastgit ','sd', 'fdasf', 'fd');
console.log(test);