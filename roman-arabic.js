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

// split the number into 1000s, 100s, 10s and 1s
function decomposedNumbers(input) {
    var decomposedDigits = input.split("");

    return decomposedDigits;
    // return decomposedDigits.map(function(currentValue, i, decomposedDigitArray) {
    //     var inputLength = decomposedDigitArray.length;
    //     var exponent = inputLength - i - 1;
    //     var digitExtracted = parseInt(currentValue);
    //     return (digitExtracted * Math.pow(10, exponent));
    // });

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
    var diff = 0;
    var tensPower = 0;
    var powerOfTensValue;

    var mappedReverseRomanList = decomposedReversedList.map(function(currentValue, i){
        tensPower = Math.pow(10, i);
        powerOfTensValue = currentValue * tensPower;

        if(arabicToRomanMap[powerOfTensValue])
        {   
            return arabicToRomanMap[powerOfTensValue];
            
        }
        else
        {
            if(powerOfTensValue < (5 * tensPower))
            {
                return (arabicToRomanMap[tensPower].repeat(powerOfTensValue / tensPower));
            }
            else if(powerOfTensValue > (5 * tensPower))
            {
                diff = powerOfTensValue - (5 * tensPower);
                return (arabicToRomanMap[(5 * tensPower)] + arabicToRomanMap[tensPower].repeat(diff / tensPower));
            }
            else if(powerOfTensValue === (5 * tensPower))
            {
                return  (arabicToRomanMap[5 * tensPower]);
            }
        }
        
    });

    return mappedReverseRomanList.reverse().join('');
}

var roman = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
const romanToArabicMap = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
};

function isRoman(input) {
    var length = input.length;
    for (var i = 0; i < length; i++) {
        if (invalidRomanRuleForI(input, i))
        {   
            return false;
        }
        else 
        {   
            return true;
        }

    }
    return true;

}

function invalidRomanRuleForCharacterOrder(character1InSequence, character2InSequence) {
    if (romanToArabicMap[character1InSequence] < romanToArabicMap[character2InSequence]) {
        if((romanToArabicMap[character1InSequence] * 10) < romanToArabicMap[character2InSequence])
            return false;

        } else {
        return true;
    }
}


function isInvalidRomanCharacter(character) {
    return (roman.indexOf(character) != -1);
}

function invalidRomanRuleForI(character1InSequence, character2InSequence, character3InSequence, character4InSequence) {
    return (character1InSequence === 'I' && character2InSequence === 'I' && character3InSequence === 'I' && character4InSequence === 'I');
}

function invalidRomanRuleForI(tempArray, i)
{   
    var sum = 0;
    for (var j = i; j < tempArray.length; j++) {
        if(tempArray[j] === 'I')
            sum ++;
    }
    if (sum>3)
        return true;
    else
        return false;
}

function invalidRomanRuleForV(character1InSequence, character2InSequence) {
    return (character1InSequence === 'V' && character2InSequence === 'V');
}

function invalidRomanRuleForL(character1InSequence, character2InSequence) {
    return (character1InSequence === 'L' && character2InSequence === 'L');
}

function invalidRomanRuleForX(character1InSequence, character2InSequence, character3InSequence, character4InSequence) {
    return (character1InSequence === 'X' && character2InSequence === 'X' && character3InSequence === 'X' && character4InSequence === 'X');
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
    }, 0);  

}

const fileInput = readline.createInterface({

    input: fs.createReadStream("inputFile.txt")

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