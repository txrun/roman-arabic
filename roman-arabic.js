// to convert roman to arabic numerals and vice versa

"use strict";

const readline = require('readline');
const fs = require('fs');

var arabicToRomanMap = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M"
};

// Array.prototype.foobar = function(x, y) {

// }

// var x = [1,2,3,4];

// x.foobar("x", "y");


// split the number into 1000s, 100s, 10s and 1s
function decomposedNumbers(input) {
    var inputLength = input.toString().length;

    var decomposedDigits = input.split("");

    return decomposedDigits.map(function(currentValue, i) {
        var exponent = inputLength - i - 1;
        var digitExtracted = parseInt(currentValue);
        return (digitExtracted * Math.pow(10, exponent));
    });

}

// to check if numbers are in range
function isNumberInRange(input) {
    return (input >= 1 && input <= 2999);
}

// to check the validity of the Arabic number input
function isNumber(input) {
    return !Number.isNaN(input);
}

function debugCallers(fnName, input, output) {
    console.log(`Calling function: ${fnName} with: ${input} and got output: ${output}`);
}

// write the split numbers in terms of Roman numerals' values
function arabicToRoman(userInput) {
    var decomposedList = decomposedNumbers(userInput);
    var len = userInput.toString().length;
    var t = 0;

    var decomposedReversedList = decomposedList.reverse();

    var mappedReverseRomanList = [];

    for (var i = 0; i < len; i++) {

        t = decomposedReversedList[i] / (Math.pow(10, i));

        if (decomposedReversedList[i] === 1 || decomposedReversedList[i] === 2 || decomposedReversedList[i] === 3) {
            mappedReverseRomanList.push('I'.repeat(t));
        } else if (decomposedReversedList[i] === 6 || decomposedReversedList[i] === 7 || decomposedReversedList[i] === 8) {
            mappedReverseRomanList.push("V" + ('I'.repeat(t - 5)));
        } else if (decomposedReversedList[i] === 60 || decomposedReversedList[i] === 70 || decomposedReversedList[i] === 80) {
            mappedReverseRomanList.push('L' + ('X'.repeat(t - 5)));
        } else if (decomposedReversedList[i] === 100 || decomposedReversedList[i] === 200 || decomposedReversedList[i] === 300) {
            mappedReverseRomanList.push('C'.repeat(t));
        } else if (decomposedReversedList[i] === 600 || decomposedReversedList[i] === 700 || decomposedReversedList[i] === 800) {
            mappedReverseRomanList.push(('D' + 'C'.repeat(t - 5)));
        } else if (decomposedReversedList[i] === 1000 || decomposedReversedList[i] === 2000) {
            mappedReverseRomanList.push('M'.repeat(t));
        } else if (decomposedReversedList[i] === 10 || decomposedReversedList[i] === 20 || decomposedReversedList[i] === 30) {
            mappedReverseRomanList.push('X'.repeat(t));
        } else if (decomposedReversedList[i] === 60 || decomposedReversedList[i] === 70 || decomposedReversedList[i] === 80) {
            mappedReverseRomanList.push(('L' + ('X'.repeat(t - 5))));
        } else {
            mappedReverseRomanList.push(arabicToRomanMap[decomposedReversedList[i]]);
        }

    }

    return mappedReverseRomanList.reverse().join('');

}

var roman = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
var romanToArabicMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
};

// to check the correctness of the Roman numeral input
function isRoman(input) {
    var length = input.length;
    for (var i = 0; i < length; i++) {
        return (isInvalidRomanCharacter(input[i]) &&
            invalidRomanRuleForI(input[i], input[i + 1], input[i + 2], input[i + 3]) &&
            invalidRomanRuleForV(input[i], input[i + 1]) &&
            invalidRomanRuleForL(input[i], input[i + 1]) &&
            invalidRomanRuleForX(input[i], input[i + 1], input[i + 2], input[i + 3]) &&
            invalidRomanRuleForCharacterOrder(input[i], input[i+1]));

    }
    return true;

}

function invalidRomanRuleForCharacterOrder(character1InSequence, character2InSequence) {
    if (romanToArabicMap[character1InSequence] < romanToArabicMap[character2InSequence]) {
        return ((romanToArabicMap[character1InSequence] * 10) < romanToArabicMap[character2InSequence]);
    } else {
        return true;
    }
}

function isInvalidRomanCharacter(character) {
    return (roman.indexOf(character) != -1);
}

function invalidRomanRuleForI(character1InSequence, character2InSequence, character3InSequence, character4InSequence) {
    return !(character1InSequence === 'I' && character2InSequence === 'I' && character3InSequence === 'I' && character4InSequence === 'I');
}

function invalidRomanRuleForV(character1InSequence, character2InSequence) {
    return !(character1InSequence === 'V' && character2InSequence === 'V');
}

function invalidRomanRuleForL(character1InSequence, character2InSequence) {
    return !(character1InSequence === 'L' && character2InSequence === 'L');
}

function invalidRomanRuleForX(character1InSequence, character2InSequence, character3InSequence, character4InSequence) {
    return !(character1InSequence === 'X' && character2InSequence === 'X' && character3InSequence === 'X' && character4InSequence === 'X');
}



// converting roman numerals to arabic
function romanToArabic(input) {
    var romanCharacterArray = input.split("");

    return romanCharacterArray.reduce(function(total, currentValue, i, romanArr) {
        
        if (i !== 0 && romanToArabicMap[currentValue] > romanToArabicMap[romanArr[i-1]]) {
            return total;
        } 
        else if (romanToArabicMap[currentValue] < romanToArabicMap[romanArr[i + 1]]) {
            total += romanToArabicMap[romanCharacterArray[i + 1]] - romanToArabicMap[currentValue];
            return total;
        } 
        else {
            total += romanToArabicMap[currentValue];
            return total;
        }
    }, 0);  //

}

const fileInput = readline.createInterface({
    input: fs.createReadStream('inputFile.txt')
});


fileInput.on('line', (line) => {

    if (isNumber(line) && isNumberInRange(line)) {
        var romanNumber = arabicToRoman(line);
        console.log(romanNumber);
    } else if (isRoman(line)) {
        var theRomanResult = romanToArabic(line);
        console.log(theRomanResult);
    } else {
        console.log("Not a valid input!");
    }

});