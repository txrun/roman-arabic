
// to convert roman to arabic numerals and vice versa

"use strict";
var toConvert = [];
var num2=23e9;

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

//console.log(arabicToRomanMap[5]);

    
//split the number into 1000s, 100s, 10s and 1s
function splitArabicNumbers()
{
    var num=num2;
    len=num.toString().length;
    var i=len-1;
    while(num>=1)
    {
        digit = num%10;
        str[i] = digit;
        if(checkTheArabic(digit)===false)
        {
            console.log("Invalid Input");
            break;
        }
        i--;
        num=parseInt(num/10);
    }
      
    var k=3;
    i=0; 
    var str2 = [];
    console.log(num2 + "=");
    for (var j = 0; j < len; j++) {
        str2[i]=str[j]*(Math.pow(10,k));
        k--;
        i++;
    };
    console.log(str);
    console.log(str2);
}

//to check the validity of the Arabic number input
function checkTheArabic(n1)
{   
    //to check if numbers are in range
    // if(num2>=0 && num2<=2999)
    // { 
    //     return true;
    // }
    if(isNaN(n1))
    {
        console.log(n1+"Not a number");
        return false;
    }
    else
    {
        console.log(n1+"is a number");
        return true;
    }

    //to check if input numeber has illegal characters(e.g. Letters of the alphabet)

}


//write the split numbers in terms of Roman numerals' values
    
function arabicToRoman()
{
    splitArabicNumbers();
      
    var i=0;
      
    if(len===4) //  M = 1000
    { 
        var t=str[i];
        if(str[i]===1||str[i]===2)
        {
            console.log('M'.repeat(t));
        }
    }
    len--;
    i++;

    if(len===3) // C = 100
    {
        var t=str[i];
        if(str[i]===1||str[i]===2||str[i]===3)
        { 
            console.log('C'.repeat(t));
        }
        else if(str[i]===4)
        {
            console.log("CD");
        }
        else if(str[i]===5)
        {
            var t=str[i];
            for (var k = 0; k < t; k++) {
                console.log('C');
            };
        }
        else if(str[i]===6||str[i]===7||str[i]===8)
        {
            console.log('D'+'C'.repeat(t-5));
        }
        else if(str[i]===9)
        {
            console.log("CM");
        }
    }
    len--;
    i++;

    if(len===2) // X = 10
    {
        var t=str[i];
        if(str[i]===1||str[i]===2||str[i]===3)
        { 
            for (var k = 0; k < t; k++) {
                console.log('X');
            };
        }
        else if(str[i]===4)
        {
            console.log("XL");
        }
        else if(str[i]===5)
        {
            console.log('L');
        }
        else if(str[i]===6||str[i]===7||str[i]===8)
        {
            console.log('L'+('X'.repeat(t-5)));
        }
        else if(str[i]===9)
        {
            console.log("XC");
        }
    }
    len--;
    i++;

    if(len===1) // I = 1
    {
        var t=str[i];
        if(str[i]===1||str[i]===2||str[i]===3)
        { 
            console.log('I'.repeat(t));
        }
        else if(str[i]===4)
        {
            console.log("IV");
        }
        else if (str[i]===5)
        {
            console.log("V");
        }
        else if (str[i]===6||str[i]===7||str[i]===8)
        {
            console.log("V"+'I'.repeat(t-5));
        }
        else if (str[i]===9)
        {
            console.log("IX");
        }
    }
    len--;
    i++;
}

//Roman Numeral Input
var num4 = ['C','C','C','L','X','V']; //365
// var num4 = ['M','C','C','C','X','X','X','I','X']; //1339
// var num4 = ['D','C','X','L','I','I','I']; //643
var a=[]; 
var roman = ['M','D','C','L','X','V','I'];
// to check the correctness of the Roman numeral input
    
function checkTheRoman()
{
    len = num4.length;
    console.log(len);
    for (var i = 0; i < len; i++) {
        //to check if the input has letters besides that in the Roman numerals
        if(roman.indexOf(num4[i])===-1)
        // if(num4[i]!=='M'||num4[i]!=='D'||num4[i]!=='C'||num4[i]!=='L'||num4[i]!=='X'||num4[i]!=='V'||num4[i]!=='I')
        {
            console.log("Num is not valid");
            return false;
        }
        else 
        {
            console.log("Num is valid");
            return true;
        }

        // to check if the Roman numeral has more than 3 consecutive Is
        if(num4[i]==='I' && num4[i+1]==='I' && num4[i+2]==='I' && num4[i+3]==='I')
        {
            console.log("Num is not valid 3Is");
           return false;
        }

        // to check if the Roman numeral has consecutive Vs or Ls
        if((num4[i]==='V' && num4[i+1]==='V')||(num4[i]==='L'&&num4[i+1]==='L'))
        {
           console.log("Num is not valid 2Vs 2Ls");
            return false;
        }

        // to check if the Roman numeral has consecutive Xs
        if(num4[i]==='X' && num4[i+1]==='X' && num4[i+2]==='X' && num4[i+3]==='X')
        {
            console.log("Num is not valid 3Xs");
            return false;
        }

        // to check legality of the order of the Roman numerals
        if(a[i]<a[i+1])
        {
            if((a[i]*10)<a[i+1])
            {
                console.log("Num is not in legal order");
                return false;
            }
        } 


    };

} 
    

// split the Roman numerals into individual arabic numbers
function splitRomanNumbers()
{
    len = num4.length;
    for (var i = 0; i < len; i++) 
    {
        if (num4[i]==='M')
            a[i]=1000;
        else if (num4[i]==='D')
            a[i]=500;
        else if (num4[i]==='C')
            a[i]=100;
        else if (num4[i]==='L')
            a[i]=50;
        else if (num4[i]==='X')
            a[i]=10;
        else if (num4[i]==='V')
            a[i]=5
        else if (num4[i]==='I')
            a[i]=1;
    };
}

// converting roman numerals to arabic
function romanToArabic()
{     
    i=0;
    len=num4.length;
    var sum=0,flag=0;

    splitRomanNumbers();
     
    for (var i = 0; i < len; i++) 
    {
        // console.log(i);
        if(flag===1)
        {
            flag=0;
            continue;
        }

        if (a[i]<a[i+1])
        {
            sum = sum + (a[i+1]-a[i]);
            // console.log(i);
            flag=1;
        }
        else if(a[i]>=a[i+1])
        {
            sum = sum + a[i];
            // console.log(i);
        }
        else
        {
            sum=sum+a[i];
        }
    };
      
    console.log(num4);
    console.log("Equavalent arabic : "+sum);

}

// if(checkTheArabic()===true)
    arabicToRoman();
// else
    // console.log("Wrong Arabic Input");

console.log(num4.toString());
    
    
if(checkTheRoman()===true)
{
    romanToArabic();
}
else
{
    console.log("Not a valid Roman numeral!");
}

    

