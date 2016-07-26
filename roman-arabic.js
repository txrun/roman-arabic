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
    1000: "M",
    2000: "MM"
};

// to check if numbers are in range
function isNumberInRange(input) {
    return (parseInt(input) >= 1 && parseInt(input) <= 3999);
}

// to check the validity of the Arabic number input
function isNumber(input) {
    return !Number.isNaN(input);
}

// write the split numbers in terms of Roman numerals' values
function arabicToRoman(userInput) {
    var decomposedDigits = userInput.split("");
    
    var mappedRomanList = decomposedDigits.map(function(currentValue, i){
        var exponent = decomposedDigits.length -i -1;
        var tensPower = Math.pow(10, exponent);
        var powerOfTensValue = currentValue * tensPower;

        if(arabicToRomanMap[powerOfTensValue])
            return arabicToRomanMap[powerOfTensValue];
        else if (powerOfTensValue < (5 * tensPower))
            return (arabicToRomanMap[tensPower].repeat(powerOfTensValue / tensPower));
        else{
            var diff = powerOfTensValue - (5 * tensPower);
            return (arabicToRomanMap[(5 * tensPower)] + arabicToRomanMap[tensPower].repeat(diff / tensPower));
        }
    });
    return mappedRomanList.join('');
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
            isInvalidRomanCharacter(input[i])) {   
            return false;
        }
    }
    return true;
}

function invalidRomanRuleForCharacterOrder(tempArray, i) {
    for(var j = i;j < tempArray.length - 1; j++) {
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
        if(tempArray.slice(j, j+4) === "IIII" || tempArray.slice(j, j+4) === "XXXX" || tempArray.slice(j, j+4) === "CCCC")
            return true;
    }
    return false;
}

function invalidRomanRuleForVLD(tempArray, i) {
   for (var j = i; j < tempArray.length-1; j++) {
        if((tempArray.slice(j, j+2) === "LL" || tempArray.slice(j, j+2) === "DD" || tempArray.slice(j, j+2) === "VVV"))
            return true;
    }
    return false;
}

// converting roman numerals to arabic
function romanToArabic(input) {
    var romanCharacterArray = input.split("");

    return romanCharacterArray.reduce(function(total, currentValue, i, romanArr) {
        
        if (i > 0 && romanToArabicMap[currentValue] > romanToArabicMap[romanArr[i-1]]) {
            return total;
        } else if (romanToArabicMap[currentValue] < romanToArabicMap[romanArr[i + 1]]) {
            total += romanToArabicMap[romanCharacterArray[i + 1]] - romanToArabicMap[currentValue];
            return total;
        } else {
            total += romanToArabicMap[currentValue];
            return total;
        }
    }, 0);  
}

const fileInput = readline.createInterface({

    input: fs.createReadStream(process.argv[2])
});

fileInput.on('line', (line) => {

    if (isNumber(line) && isNumberInRange(line)) {
        var romanNumber = arabicToRoman(line);
        console.log(romanNumber);
    } else if (isRoman(line)) {
        var arabicNumber = romanToArabic(line);
        console.log(arabicNumber);
    } else {
        console.log("Not a valid input!");
    }
});