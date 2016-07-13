// to convert roman to arabic numerals and vice versa

    var toConvert = [];
    // var num1=894;
    // var num2=982;
    var num2=2479;
    // var num3=496;

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
  
    //split the number into 100s and 10s and 1s
    function splitNumbers()
    {
      num=num2;
      len=num.toString().length;
      var i=len-1;
      while(num>=1)
      {
        digit = num%10;
        str[i] = digit;
        i--;
        num=parseInt(num/10);
      }
      
      var k=2;
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

    //write the split numbers in terms of Roman numerals' values
    
    function arabicToRoman()
    {

    splitNumbers();
    var roman = [];
    i=0;
    
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


     
     // converting roman numerals to arabic
    function romanToArabic()
    {
     // var num4 = ['C','C','C','L','X','V']; //365
      // var num4 = ['M','C','C','C','X','X','X','I','X']; //1339
      var num4 = ['D','C','X','L','I','I','I']; //643
     i=0;
     len=num4.length;
     var a=[]; 
     var sum=0,flag=0;

     for (var i = 0; i < len; i++) {
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

     for (var i = 0; i < len; i++) {
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
    
     console.log("Equavalent arabic : "+sum);

    }

    romanToArabic();
    arabicToRoman();

    

