// to convert roman to arabic numerals and vice versa

    var toConvert = [];
    // var num1=894;
    // var num2=982;
    var num2=2479;
    // var num3=496;

    var str=[];
    var len;
    var digit;

    // var romanMap = {
    //   "I":"1",
    //   "V":"5",
    //   "X":"10",
    //   "L":"50",
    //   "C":"100",
    //   "D":"500",
    //   "M":"1000"
    // };

    //split the number into 100s and 10s and 1s
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
    
    //write the split numbers in terms of Roman numerals' values
    var roman = [];
    i=0;
    
      if(len===4)
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
          // console.log(str[i]);
          // var t=str[i];
          for (var k = 0; k < t; k++) {
            console.log('C');
          };
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
          // var t=str[i];
          console.log('I'.repeat(t));
          // for (var k = 0; k < t; k++) {
          //   console.log('I');
          // };
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
    


