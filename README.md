### Setup :

Firstly, clone the repository to your local machine.

Then-
```
$ cd <project directory>
$ node roman-arabic.js <input-file>.txt
```

## Problem overview - Convert between Roman and Arabic numerals

Arabic numerals are made up of numbers 0-9.

Roman numerals are made up of characters I, V, X, L, C, D, M. Each of 
these Roman numeral characters have values 1, 5, 10, 50, 100, 500, 1000 
respectively.

To convert a Roman numeral to its respective Arabic numeral, we simply 
add the	values of the sequence of letters.
For instance, XVIII = 100 + 5 + 1 + 1 + 1 = 18.
If a smaller value character is placed before a larger one, a 
subtraction is performed instead of addition. IV = 5 - 1 = 4.

The same rules can be used to convert Arabic to Roman numerals- Simply 
convert one digit at a time.
For example 1498 = 1000 + 400 + 90 + 8
		 = M + CD + XC + VIII
		 = MCDXCVIII

Note: For subtraction, you follow three simple rules:
- Subtract only a single letter from a single numeral
- Subtract only powers of ten.
  For example, 45 cannot be written as VL, but only as XLV
- Do not subtract a letter from another letter more than ten times 
  greater. This means, you can subtract I from V or X from C, etc. but 
  not I from C or I from M.
