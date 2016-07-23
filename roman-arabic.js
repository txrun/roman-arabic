// to convert roman to arabic numerals and vice versa

"use strict";

const readline = require('readline');
const fs = require('fs');

var arabicToRomanMap = {
    1:"I",
    4: "IV",
    5:"V",
    9: "IX",
    10:"X",
    40: "XL",
    50:"L",
    90: "XC",
    100:"C",
    400: "CD",
    500:"D",
    900: "CM",
    1000:"M"
        
};

    
//split the number into 1000s, 100s, 10s and 1s
function decomposedNumbers(input)
{
    var decomposedPowerOfTenDigits = [];
    var inputLength = input.toString().length;
    var k, n;    
    var i = 0;

    var decomposedDigits = input.split("");

    var decomposedPowerOfTenDigits = decomposedDigits.map(function(currentValue, i){
        k = inputLength - i -1;
        n = parseInt(currentValue);
        return (currentValue * Math.pow(10,k));
    });

    return decomposedPowerOfTenDigits;

}

//to check if numbers are in range
function isNumberInRange(input)
{   
    return(input >= 1 && input <= 2999);    
}

//to check the validity of the Arabic number input
function isNumber(input)
{
    return !Number.isNaN(input);
}

function debugCallers(fnName, input, output) {
  console.log(`Calling function: ${fnName} with: ${input} and got output: ${output}`);
}

//write the split numbers in terms of Roman numerals' values
function arabicToRoman(userInput)
{
    var decomposedList = decomposedNumbers(userInput);
    var i=0;
    var len = userInput.toString().length;
    var n;
    var t = 0;

    var decomposedReversedList = decomposedList.reverse();

    var mappedReverseRomanList = [];

    for (var i = 0; i < len; i++) {
      
      t = decomposedReversedList[i] / (Math.pow(10,i));

      if(decomposedReversedList[i]===1||decomposedReversedList[i]===2||decomposedReversedList[i]===3)
      { 
          mappedReverseRomanList.push('I'.repeat(t));
      }
      
      else if (decomposedReversedList[i]===6||decomposedReversedList[i]===7||decomposedReversedList[i]===8)
      {
          mappedReverseRomanList.push("V"+('I'.repeat(t-5)));
      }
      
      else if(decomposedReversedList[i]===60||decomposedReversedList[i]===70||decomposedReversedList[i]===80)
      {
          mappedReverseRomanList.push('L'+('X'.repeat(t-5)));
      }
      else if(decomposedReversedList[i]===100||decomposedReversedList[i]===200||decomposedReversedList[i]===300)
      { 
          mappedReverseRomanList.push('C'.repeat(t));
      }

      else if(decomposedReversedList[i]===600||decomposedReversedList[i]===700||decomposedReversedList[i]===800)
      {
          mappedReverseRomanList.push(('D'+'C'.repeat(t-5)));
      }
      
      else if (decomposedReversedList[i]===1000||decomposedReversedList[i]===2000)
      {   
          mappedReverseRomanList.push('M'.repeat(t));
      }
      else if(decomposedReversedList[i]===10||decomposedReversedList[i]===20||decomposedReversedList[i]===30)
      { 
        mappedReverseRomanList.push('X'.repeat(t));
      }
      
      else if(decomposedReversedList[i]===60||decomposedReversedList[i]===70||decomposedReversedList[i]===80)
      {
          mappedReverseRomanList.push(('L'+('X'.repeat(t-5))));
      }
      
      else {
        mappedReverseRomanList.push(arabicToRomanMap[decomposedReversedList[i]]);
      }
      
    }
   
    return mappedReverseRomanList.reverse().join('');
   
}

var roman = ['M','D','C','L','X','V','I'];
var romanToArabicMap = {
  I : 1,
  V : 5,
  X : 10,
  L : 50,
  C : 100,
  D : 500,
  M : 1000
};

// to check the correctness of the Roman numeral input
function isRoman(input)
{   
    var length = input.length;
    var j = 0;
    var a = [];
    for (var i = 0; i < length; i++) {
        j = i;
        
        return (isInvalidRomanCharacter(input[i]) &&
            romanRuleForI(input[i], input[i+1], input[i+2], input[i+3]) &&
            romanRuleForV(input[i], input [i+1]) &&
            romanRuleForL(input[i], input[i+1]) &&
            romanRuleForX(input[i], input[i+1], input[i+2], input[i+3]));
        
    };
   return true;

} 

function romanRuleForCharacterOrder(character1InSequence, character2InSequence)
{
  if(romanToArabicMap[character1InSequence] < romanToArabicMap[character2InSequence])
  {
      return((romanToArabicMap[character1InSequence] * 10) < romanToArabicMap[character2InSequence]);   
  }
  else
      {
        return true;
      }
}

function isInvalidRomanCharacter(character)
{
  return !(roman.indexOf(character) === -1)
} 

function romanRuleForI(character1InSequence, character2InSequence, character3InSequence, character4InSequence)
{
  return !(character1InSequence === 'I' && character2InSequence === 'I' && character3InSequence === 'I' && character4InSequence === 'I')
}   

function romanRuleForV(character1InSequence, character2InSequence)
{
  return !(character1InSequence === 'V' && character2InSequence === 'V')
}

function romanRuleForL(character1InSequence, character2InSequence)
{
  return !(character1InSequence === 'L' && character2InSequence === 'L')
}

function romanRuleForX(character1InSequence, character2InSequence, character3InSequence, character4InSequence)
{
  return !(character1InSequence === 'X' && character2InSequence === 'X' && character3InSequence === 'X' && character4InSequence === 'X')
}

// split the Roman numerals into individual arabic numbers
function splitRomanNumbers(input)
{    
    var inputArr = input.split(""); //need to convert to array for map function
    var equavalentRomanCharacterArray = inputArr.map(function(value, i){
        return romanToArabicMap[value];
    });

    return equavalentRomanCharacterArray;
}


// converting roman numerals to arabic
function romanToArabic(input)
{     
    var len = input.length;
    var sum = 0, flag = 0;

    var splitRomanArray = splitRomanNumbers(input);
     
    for (var i = 0; i < len; i++) 
    {
        if(flag === 1)
        {
            flag = 0;
            continue;
        }

        if (splitRomanArray[i] < splitRomanArray[i+1])
        {
            sum = sum + (splitRomanArray[i+1]-splitRomanArray[i]);
            flag = 1;
        }
        else if(splitRomanArray[i] >= splitRomanArray[i+1])
        {
            sum = sum + splitRomanArray[i];
        }
        else
        {
            sum = sum + splitRomanArray[i];
        }
    };
      
    return sum;

}

const fileInput = readline.createInterface({
  input: fs.createReadStream('inputFile.txt')
});


fileInput.on('line', (line) => {
  // console.log(line);

      if(isNumber(line) && isNumberInRange(line))
      {  
        var romanNumber = arabicToRoman(line);
        console.log(romanNumber);
      } 

      else if(isRoman(line))
      {
          var theRomanResult = romanToArabic(line);
          console.log(theRomanResult);
      }
      else
      {
          console.log("Not a valid input!");
      }

});
  