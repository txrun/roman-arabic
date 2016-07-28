### How to run this program :

The range of Arabic input vlaues (1-3999) is stored in a file called 
numbers.txt. This file is given as input during runtime from the 
terminal.
```
#node roman-arabic.js numbers.txt
```

The output from this can be stored into another file roman.txt to verify 
reverse translation to Arabic values, and the output from this execution 
is stored into another file numbers-dup.txt.

We can verify the program works flawlessly by comparing the initial 
input file numbers.txt with numbers-dup.txt. If contents of both files 
are equal then it means the program works.


## Convert between Roman and Arabic numerals - The Logic

The program converts an Arabic numeral input to its corresponding Roman 
numeral and vice versa.

Translating an Arabic to a Roman numeral :

The permissible range of input values is from 1 - 3999. So, the first 
thing that is done is to check whether the input is in this range, and 
also the individual digits are actually numbers and not any other 
characters.

For the actual translation, the input number is split into its 
individual digits, and these individual digits further converted into 
denomintaions of powers of ten based on its place value.

For example, 2489 will be split up as 2000, 400, 80, and 9.

For each of these numbers it is checked whether the number has a 
standard Roman representation. Otherwise, each of these numbers are 
compared with the appropriate multiple of 5 depending on the place value 
of the number. If the the number is less than its appropriate five's 
multiple then the Roman equivalent of the place value is repeated as 
many times as the digit's value. If either of the above comparisons do 
not satisfy then the Roman value of the five's multiple is along with 
the Roman value of the place value(repeated as per the number) is 
returned.

This list of checks is done for each position of the input number.

Connverting a Roman number to its equivalent Arabic

A characters of the Roman numeral alphabet are - I, V, X, L, C, D, M. 
One of the first checks done on the Roman input numeral is to see 
whether any illegal characters are present in it. Besides this, 
every Roman numeral follows three rules :
(i) A Roman numeral cannot have more than three consequtive Is, Xs or 
Cs
(ii) A Roman numeral cannot have cosequtive Vs, Ls or Ds
(iii) If a lower value Roman character precedes a character then that 
character's value should not only be a power of 10 but also ten times 
greater than the following character.

When a Roman input checks the above four conditions, it is a valid Roman 
numeral.

To convert a Roman numeral to its Arabic equivalent, the characters are 
directly converted to their corresponding Arabic values and added 
together. The one check to look out for is, whether a character is 
followed by a bigger value character. In such a case, the lower value 
character is subtracted from the bigger value. 
