// to convert roman to arabic numerals and vice versa

"use strict";

const readline = require('readline');
const fs = require('fs');

var arabicToRomanMap = {
    1:"I",
    5:"V",
    10:"X",
    50:"L",
    100:"C",
    500:"D",
    1000:"M"
};

    
//split the number into 1000s, 100s, 10s and 1s
function decomposedNumbers(input)
{
    var decomposedPowerOfTenDigits = [];
    var inputLength = input.toString().length;
    var k = 0;
    
    
    k = inputLength - 1;
    var j=0;
    var decomposedDigits = input.split("");
    decomposedDigits.forEach(function (value, i){
      decomposedPowerOfTenDigits[j] = value * Math.pow(10,k);
      j++;
      k--;
    });
   
    // k = 0;
    // for (var i = inputLength - 1; i >= 0; i--) {
    //     decomposedPowerOfTenDigits[i] = (input % 10) * Math.pow(10,k);
    //     input = parseInt(input / 10);
    //     k++;
    // }

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
    return !isNaN(input);
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
    var romanResult = "";

    if(len===4) //  M = 1000
    { 
        var t=decomposedList[i]/1000;
        // console.log(decomposedList[i]);
        if(decomposedList[i]===1000||decomposedList[i]===2000)
        {  
            romanResult = romanResult + 'M'.repeat(t);
        }
        len--;
        i++;
    }

    if(len===3) // C = 100
    {
        var t=decomposedList[i]/100;
        if(decomposedList[i]===100||decomposedList[i]===200||decomposedList[i]===300)
        { 
            romanResult = romanResult + 'C'.repeat(t);
        }
        else if(decomposedList[i]===400)
        {
            romanResult = romanResult + "CD";
        }
        else if(decomposedList[i]===500)
        {
            romanResult = romanResult + 'D';
        }
        else if(decomposedList[i]===600||decomposedList[i]===700||decomposedList[i]===800)
        {
            romanResult = romanResult + ('D'+'C'.repeat(t-5));
        }
        else if(decomposedList[i]===900)
        {
            romanResult = romanResult + ("CM");
        }
        len--;
        i++; 
    }
    
    if(len===2) // X = 10
    {
        var t=decomposedList[i]/10;
        if(decomposedList[i]===10||decomposedList[i]===20||decomposedList[i]===30)
        { 
            for (var k = 0; k < t; k++) {
                romanResult = romanResult + 'X';
            };
        }
        else if(decomposedList[i]===40)
        {
            romanResult = romanResult + "XL";
        }
        else if(decomposedList[i]===50)
        {
            romanResult = romanResult + 'L';
        }
        else if(decomposedList[i]===60||decomposedList[i]===70||decomposedList[i]===80)
        {
            romanResult = romanResult + ('L'+('X'.repeat(t-5)));
        }
        else if(decomposedList[i]===90)
        {
            romanResult = romanResult + "XC";
        }
        len--;
        i++;
    }

    if(len===1) // I = 1
    {
        var t=decomposedList[i];
        if(decomposedList[i]===1||decomposedList[i]===2||decomposedList[i]===3)
        { 
            romanResult = romanResult + 'I'.repeat(t);
        }
        else if(decomposedList[i]===4)
        {
            romanResult = romanResult + "IV";
        }
        else if (decomposedList[i]===5)
        {
            romanResult = romanResult + "V";
        }
        else if (decomposedList[i]===6||decomposedList[i]===7||decomposedList[i]===8)
        {
            romanResult = romanResult + ("V"+'I'.repeat(t-5));
        }
        else if (decomposedList[i]===9)
        {
            romanResult = romanResult + "IX";
        }
        len--;
        i++;
    }
    return romanResult;    
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
        
        if (!isCharacterPresentInRomanArray(input[i]) &&
            !romanRuleForI(input[i], input[i+1], input[i+2], input[i+3]) &&
            !romanRuleForV(input[i], input [i+1]) &&
            !romanRuleForL(input[i], input[i+1]) &&
            !romanRuleForX(input[i], input[i+1], input[i+2], input[i+3]))
        {
          return false;
        }
        else
        {
          return true;
        }

    };
   return true;

} 



function romanRuleForCharacterOrder(character1InSequence, character2InSequence)
{
  if(romanToArabicMap[character1InSequence] < romanToArabicMap[character2InSequence])
  {
      if((romanToArabicMap[character1InSequence] * 10) < romanToArabicMap[character2InSequence])
      {
        return false;
      }

      else
      {
        return true;
      }
      
  }
  else
      {
        return true;
      }
}

function isCharacterPresentInRomanArray(character)
{

  if(roman.indexOf(character) === -1)
  {
    return false;
  } 
  else
  {
    return true;
  }
} 

function romanRuleForI(character1InSequence, character2InSequence, character3InSequence, character4InSequence)
{
  if(character1InSequence === 'I' && character2InSequence === 'I' && character3InSequence === 'I' && character4InSequence === 'I')
  {
    return false;
  }
  else
  {
    return true;
  }
}   

function romanRuleForV(character1InSequence, character2InSequence)
{
  if(character1InSequence === 'V' && character2InSequence === 'V')
  {
    return false;
  }
  else
  {
    return true;
  }
}

function romanRuleForL(character1InSequence, character2InSequence)
{
  if(character1InSequence === 'L' && character2InSequence === 'L')
  {
    return false;
  }
  else
  {
    return true;
  }
}

function romanRuleForX(character1InSequence, character2InSequence, character3InSequence, character4InSequence)
{
  if(character1InSequence === 'X' && character2InSequence === 'X' && character3InSequence === 'X' && character4InSequence === 'X')
  {
    return false;
  }
  else
  {
    return true;
  }
}

// split the Roman numerals into individual arabic numbers
function splitRomanNumbers(input)
{
    var equavalentRomanCharacterArray = [];
    var len = input.length;
    for (var i = 0; i < len; i++) 
    {
        if (input[i] === 'M')
            equavalentRomanCharacterArray[i]=1000;
        else if (input[i] === 'D')
            equavalentRomanCharacterArray[i]=500;
        else if (input[i] === 'C')
            equavalentRomanCharacterArray[i]=100;
        else if (input[i] === 'L')
            equavalentRomanCharacterArray[i]=50;
        else if (input[i] === 'X')
            equavalentRomanCharacterArray[i]=10;
        else if (input[i] === 'V')
            equavalentRomanCharacterArray[i]=5
        else if (input[i] === 'I')
            equavalentRomanCharacterArray[i]=1;
    };

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
  