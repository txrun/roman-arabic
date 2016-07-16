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

The Arabic value to be converted is stored in the variable 'num4'. For 
example num4=2389. Two functions to check the legality of the number 
is present - isNumberInRange(), to check if the input value is in 
the permissible range, isNumber(), to check if the input is an 
Arabic numeral.

This value, num4, is passed to a function decomposedNumbers() which
splits up the digits 2,3,8,9 and stores them in an array in the form of
denominations of power of 10. So in this case - 2000,300,80,9.

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

length(2389) = length([2000,300,80,9])

