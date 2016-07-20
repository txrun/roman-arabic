# roman-arabic
Converts between roman and arabic numerals

The input is currently hard-coded into two variables - one for the 
arabic numeral input and a second one that stores the roman numeral 
input.

The program is run from the terminal using the node command -
```
$node roman-arabic.js
```

Program Logic - 

Translating Arabic to Roman numerals.

The Arabic value to be converted is stored in the variable 
'someInputNumber'. In the program we have taken someInputNumber=1489. Two 
functions to check the validity of the number is present - isNumberInRange(),
to check if the input value is in the permissible range, isNumber(), to check 
if the input is indeed an Arabic numeral.

This value, 1489, is passed to a function decomposedNumbers() which
splits up the digits 1,4,8,9 and stores them in an array in the form of
denominations of power of 10. So in this case - 1000, 400, 80, 9.

Passing these numbers to the function arabicToRoman() to translate them 
to Roman. Now the symbols of the Roman numeral and equavalent numerical 
value is as follows -
I  => 1
V  => 5
X  => 10
L  => 50
C  => 100
D  => 500
M  => 1000

In arabicToRoman(), we check for the length of the number(which is 
same as length of the array we get from decomposedNumbers().

length(1489) = length([1000,400,80,9]) = 4

After this the denomination of each of the decomposedNumbers is checked 
for translation. The denomination of the number is identified by 
calculating the length of the number in the array. So in this case, the 
first decomposed number is 1000; its length is 4. Similarly, following 
values 400, 8, and 9 of lengths 3, 2, and 1 have denominations of 100, 
10, and 1 respectively. This is important as the Roman characters are 
assigned based on the denomination of the value.

An empty string array romanResult is initialized to store the result.

When length = 4,that means denomination of 1000, M is added 1 time. If 
the decomposed number was 2000 M would be repeated twice(2000/1000) and 
stored into romanResult.

Currently, romanResult = M

For the value of next denomination,100 - 
* if the decomposed number is 1, 2, or 3 the character 'C' is appended 
to romanResult 1, 2, or 3 times respectively.
* if the decomposed number is 4, "CD" is appended to romanResult
* if the decomposed number is 5, 'D' is appended to romanResult
* if the decomposed number is 6, 7, or 8, 'D' is appended to appended 
along with 'C' which is repeated 1, 2, or 3 times 
respectively(depending on value of the decomposed number).
* if the decomposed number is 9, "CM" is appended to the romanResult.

In our example, the decomposed number with denomination 100 is 4. So, 
"CD" is appended to the romanResult.

Now, romanResult = MCD


For the value at the next denomination, i.e. 10 -
* if the decomposed number is 1, 2, or 3, 'X' is appended 1, 2, or 3 
times respectively to romanResult
* if decomposed number is 4, "XL" is appended to romanResult
* if decomposed number is 5, "L" is appended to romanResult
* if decomposed number is 6, 7, or 8, 'L' is appended once and 'X' is 
appended 1, 2, or 3 times respectively
* if decomposed number is 9 "XC" is appended to the romanResult

In our example decomposed number at tens place is 8, which means 'L' is 
appended once followed by 'X' appended 3 times to romanResult.

Now, romanResult = MCDLXXX


For the value at the next denomination, that is unit's place -
* if the decomposed number is 1, 2, or 3, 'I' is repeated 1, 2, or 3 
times respectively and appended to romanResult
* if the decomposed number is 4, "IV" is appended to romanResult
* if the decomposed number is 5, 'V' is appended to romanResult
* if the decomposed number is 6, 7, or 8, 'V' is appended to romanResult 
followed by 'I' 1, 2, or 3 times respectively
* if the decomposed number is 9, "IX" is simply appended to romanResult

In our case, the value 9 is at unit's place, so "IX" is appended to 
current value of romanResult.

i.e. final value of romanResult = MCDLXXXIX


Translating Roman numerals to Arabic.

At the beginning of this translation a function isRoman() is employed to 
check if the Roman numeral input is a valid Roman numeral. isRoman() 
carries out the following checks - 
* With the help of isCharacterPresentInRomanArray() it is checked if 
the 
Roman input has only legitimate characters of the Roman numerals, i.e. 
only - M, D, C, L, X, V ,and I.
* The Roman input does not have more than 3 consequtive Is
* The Roman input does not have consequtive Vs
* The Roman input does not have consequtive Ls
* The Roman input does not have more than 3 consequtive Xs
* And, finally the order of the Roman characters - If the value of a 
roman character is less than the character following it, then ten times 
the first character should be more than the second character.

A function splitRomanNumbers() stores the Arabic value of the 
individual Roman characters in an array.

The actual translation to Arabic numbers is done by the function 
romanToArabic(). Here, it iterates over the length of the array of split 
roman characters. Two checks are done - 
* If the value in the array is followed by a lesser value number, the 
current value is simply added to a 'sum' variable
* If the value in the array is followed by a greater value number, the 
difference is calculated and added to 'sum',and an iteration is skipped

After the entire iteration is finished, we have the equavalent arabic 
value in 'sum'.
