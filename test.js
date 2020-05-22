let power = Math.log2(16);
    if(power === Math.round(power))
    {
        while(power > 0)
        {
            console.log("stage: " + power)
            for(let i = 1; i < (2 ** power); i+=2)
            {
                console.log(i + " vs " + (i + 1));
            }
            power--;
        }        
    }