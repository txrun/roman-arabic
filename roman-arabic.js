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

// split the number into individual numbers
function decomposedNumbers(input) {
    var decomposedDigits = input.split("");
    return decomposedDigits;   
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
        if (invalidRomanRuleForIXC(input, i) || invalidRomanRuleForVLD(input, i) ||
            invalidRomanRuleForCharacterOrder(input, i) || invalidRomanRuleForCharacterOrder(input, i) || 
            isInvalidRomanCharacter(input[i])) 
        {   
            return false;
        }

    }
    return true;

}

function invalidRomanRuleForCharacterOrder(tempArray, i) {
    for(var j =i;j < tempArray.length-1; j++){
        if (romanToArabicMap[tempArray[j]] < romanToArabicMap[tempArray[j+1]]) {
        if((romanToArabicMap[tempArray[j]] * 10) < romanToArabicMap[tempArray[j+1]])
            return true;
        } 
    }
    return false;
   
}

function isInvalidRomanCharacter(character) {
    if(roman.indexOf(character) === -1)
        return true;
    else
        return false;
}

function invalidRomanRuleForIXC(tempArray, i) 
{   for (var j = i; j < tempArray.length-3; j++) {
        if((tempArray[j] === 'I' && tempArray[j+1] === 'I' && tempArray[j+2] === 'I' && tempArray[j+3] === 'I') ||
            (tempArray[j] === 'X' && tempArray[j+1] === 'X' && tempArray[j+2] === 'X' && tempArray[j+3] === 'X') ||
            (tempArray[j] === 'C' && tempArray[j+1] === 'C' && tempArray[j+2] === 'C' && tempArray[j+3] === 'C'))
            return true;
    }
    return false;
}

function invalidRomanRuleForVLD(tempArray, i) {
   for (var j = i; j < tempArray.length-1; j++) {
        if((tempArray[j] === 'L' && tempArray[j+1] === 'L') || (tempArray[j] === 'D' && tempArray[j+1] === 'D') ||
         (tempArray[j] === 'V' && tempArray[j+1] === 'V'))
            return true;
    }
    return false;
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
    // input: fs.createReadStream(process.argv[2])

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