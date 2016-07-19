// to convert roman to arabic numerals and vice versa

"use strict";
var toConvert = [];
var num2=2389;

var str=[];
var len;
var digit;

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
    var decomposedDigits = [];
    var decomposedPowerOfTenDigits = [];
    var inputLength = input.toString().length;
    var i, j, k;

    i = inputLength - 1;
    while(input >= 1)
    {
        decomposedDigits[i] = input % 10;
        i--;
        input = parseInt(input / 10);
    }
      
    k = inputLength - 1;
    i = 0; 
    for (var j = 0; j < inputLength;  j++) {
        decomposedPowerOfTenDigits[i] = decomposedDigits[j] * Math.pow(10, k);
        k--;
        i++;
    };

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
    debugCallers("decomposedNumbers", userInput, decomposedList);
      
    var i=0;
    var len = userInput.toString().length;
    
    var romanResult = "";

    if(len===4) //  M = 1000
    { 
        var t=decomposedList[i]/1000;
        console.log(decomposedList[i]);
        if(decomposedList[i]===1000||decomposedList[i]===2000)
        {  
            romanResult = romanResult + 'M'.repeat(t);
        }
    }
    len--;
    i++;

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
            // var t=decomposedList[i];
            // for (var k = 0; k < t; k++) {
            //     romanResult = romanResult + 'C'.repeat(t);
            // };
            romanResult = romanResult + 'D';
        }
        else if(decomposedList[i]===600||decomposedList[i]===700||decomposedList[i]===800)
        {
            romanResult = romanResult + ('D'+'C'.repeat(t-5));
            // console.log('D'+'C'.repeat(t-5));
        }
        else if(decomposedList[i]===900)
        {
            romanResult = romanResult + ("CM");
            // console.log("CM");
        }
    }
    len--;
    i++;  

    if(len===2) // X = 10
    {
        var t=decomposedList[i]/10;
        if(decomposedList[i]===10||decomposedList[i]===20||decomposedList[i]===30)
        { 
            for (var k = 0; k < t; k++) {
                romanResult = romanResult + 'X';
                // console.log('X');
            };
        }
        else if(decomposedList[i]===40)
        {
            romanResult = romanResult + "XL";
            // console.log("XL");
        }
        else if(decomposedList[i]===50)
        {
            romanResult = romanResult + 'L';
            // console.log('L');
        }
        else if(decomposedList[i]===60||decomposedList[i]===70||decomposedList[i]===80)
        {
            romanResult = romanResult + ('L'+('X'.repeat(t-5)));
            // console.log('L'+('X'.repeat(t-5)));
        }
        else if(decomposedList[i]===90)
        {
            romanResult = romanResult + "XC";
            // console.log("XC");
        }
    }
    len--;
    i++;

    if(len===1) // I = 1
    {
        var t=decomposedList[i];
        if(decomposedList[i]===1||decomposedList[i]===2||decomposedList[i]===3)
        { 
            romanResult = romanResult + 'I'.repeat(t);
            // console.log('I'.repeat(t));
        }
        else if(decomposedList[i]===4)
        {
            romanResult = romanResult + "IV";
            // console.log("IV");
        }
        else if (decomposedList[i]===5)
        {
            romanResult = romanResult + "V";
            // console.log("V");
        }
        else if (decomposedList[i]===6||decomposedList[i]===7||decomposedList[i]===8)
        {
            romanResult = romanResult + ("V"+'I'.repeat(t-5));
            // console.log("V"+'I'.repeat(t-5));
        }
        else if (decomposedList[i]===9)
        {
            romanResult = romanResult + "IX";
            // console.log("IX");
        }
    }
    len--;
    i++;

    return romanResult;
}

//Roman Numeral Input
var num4 = ['C','C','C','L','X','V']; //365
// var num4 = ['M','C','C','C','X','X','X','I','X']; //1339
// var num4 = ['D','C','X','L','I','I','I']; //643
var a=[]; 
var roman = ['M','D','C','L','X','V','I'];
// to check the correctness of the Roman numeral input
    
function isRoman(input)
{   
    var length = input.length;
    var j = 0;
    for (var i = 0; i < length; i++) {
        j = i;
        
        if(!isCharacterPresentInRomanArray(input[i]))
        {
          return false;
        }        
        
        // to check if the Roman numeral has more than 3 consecutive Is
        if(!romanRuleForI(input[i], input[i+1], input[i+2], input[i+3]))
        { 
          // var validateForRuleOfI = romanRuleForI(input[i], input[i+1], input[i+2], input[i+3]);
          // debugCallers("romanRuleForI",input[i],validateForRuleOfI);
          return false;
        }

        // to check if the Roman numeral has consecutive Vs
        if(!romanRuleForV(input[i], input [i+1]))
        {
            return false;
        }

        // to check if the Roman numeral has consequtive Ls
        if(!romanRuleForL(input[i], input[i+1]))
        {
            return false;
        }

        // to check if the Roman numeral has consecutive Xs
        if(!romanRuleForX(input[i], input[i+1], input[i+2], input[i+3]))
        {
            return false;
        }

        // to check legality of the order of the Roman numerals
        if(a[i]<a[i+1])
        {
            if((a[i]*10)<a[i+1])
            {
                return false;
            }
        } 
    };
    if(j === length-1)
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
    // console.log("Equavalent arabic : "+sum);

}


var someInputNumber = 1489;
var romanNumber = "";

if(isNumber(someInputNumber) && isNumberInRange(someInputNumber))
{  
  romanNumber = arabicToRoman(someInputNumber);
  debugCallers("arabicToRoman", someInputNumber, romanNumber);
} 
else
    console.log("Error: Expected a number as input.");

var validRomanInput = "MCDLXXXIX";
var invalidRomanInput = "MCFHXXXIX";

var validRomanOutput = isRoman(validRomanInput);
var invalidRomanOutput = isRoman(invalidRomanInput); 

// var splitRomanArray = splitRomanNumbers(validRomanInput);
// debugCallers("splitRomanNumbers", validRomanInput, splitRomanArray);
 

debugCallers("isRoman", validRomanInput, validRomanOutput);
debugCallers("isRoman", invalidRomanInput, invalidRomanOutput);

if(isRoman)
{
    var theRomanResult = romanToArabic(validRomanInput);
    debugCallers("romanToArabic", validRomanInput, theRomanResult);
}
else
{
    console.log("Not a valid Roman numeral!");
}

  