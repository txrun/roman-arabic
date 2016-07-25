// to convert roman to arabic numerals and vice versa

"use strict";

const readline = require('readline');
const fs = require('fs');

const arabicToRomanMap = {
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
    var decomposedDigits = input.split("");

    return decomposedDigits.map(function(currentValue, i, decomposedDigitArray) {
        var inputLength = decomposedDigitArray.length;
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
    var decomposedReversedList = decomposedList.reverse();

    var mappedReverseRomanList = decomposedReversedList.map(function(currentValue, i){
        var t = currentValue / (Math.pow(10, i));

        if (currentValue === 1 || currentValue === 2 || currentValue === 3) {
            return ('I'.repeat(t));
        } else if (currentValue === 6 || currentValue === 7 || currentValue === 8) {
            return ("V" + ('I'.repeat(t - 5)));
        } else if (currentValue === 60 || currentValue === 70 || currentValue === 80) {
            return ('L' + ('X'.repeat(t - 5)));
        } else if (currentValue === 100 || currentValue === 200 || currentValue === 300) {
            return ('C'.repeat(t));
        } else if (currentValue === 600 || currentValue === 700 || currentValue === 800) {
            return (('D' + 'C'.repeat(t - 5)));
        } else if (currentValue === 1000 || currentValue === 2000) {
            return ('M'.repeat(t));
        } else if (currentValue === 10 || currentValue === 20 || currentValue === 30) {
            return ('X'.repeat(t));
        } else if (currentValue === 60 || currentValue === 70 || currentValue === 80) {
            return (('L' + ('X'.repeat(t - 5))));
        } else {
            return (arabicToRomanMap[currentValue]);
        }

    });

    return mappedReverseRomanList.reverse().join('');
}

var roman = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
const romanToArabicMap = {
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
        // if((i+3) % length === i+3)
        //     var tempArray = input.slice(i, i+3);
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

// function invalidRomanRuleForCharacterOrder(tempArray, index)
// {

// }

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