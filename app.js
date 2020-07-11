
const SW_RUN = 1 , SW_STOP = 0;

var id_data   = ["centisec" , "second" , "minute" , "hour"];
var comp_val  = [99 , 59 , 59 , 59];
var sw_values = [0 , 0 , 0 , 0];
var sw_flag   = SW_STOP;
var lap_count = 1;


function StartStopWatch()
{
    start_sw = setInterval(FunStopWatch , 10);
    document.getElementById("st_sw").innerHTML = "START";
    sw_flag = SW_RUN;
}


function PauseStopWatch()
{
    if (sw_flag == SW_RUN)
    {
        clearInterval(start_sw); 
        document.getElementById("st_sw").innerHTML = "CONTINUE";
        sw_flag = SW_STOP;
    }
}

function ResetStopWatch()
{
    clearInterval(start_sw); 
    document.getElementById("st_sw").innerHTML = "START";
    document.getElementById("laps-data").innerHTML = "";

    for (let index = 0; index < id_data.length; index++) 
    {
        document.getElementById(id_data[index]).innerHTML = "00";
    }    
    
    sw_flag = SW_STOP;
}

function LapStopWatch()
{
    if(sw_flag == SW_RUN)
    {
        prev_value = document.getElementById("laps-data").innerHTML;
        
        value_to_add = "<p> Lap # " + lap_count.toString() + " -> " + 
                       ConvretToString(sw_values[3]) + ":" +
                       ConvretToString(sw_values[2]) + ":" +
                       ConvretToString(sw_values[1]) + ":" +
                       ConvretToString(sw_values[0]) + "</p>" + prev_value;
        document.getElementById("laps-data").innerHTML = value_to_add;
        lap_count++;
    }    
}




// setTimeout(StartStopWatch, timeout);

function FunStopWatch()
{
    for (let index = 0; index < id_data.length; index++) 
    {
        var up_sec = StepUp(Number(document.getElementById(id_data[index]).innerHTML) , index);
        document.getElementById(id_data[index]).innerHTML = ConvretToString(sw_values[index]);
        
        if (up_sec == 0) 
        {
            break;
        }
    }
}


function StepUp (curr_value , hr_min_sec_csec)
{
    var flag = 0;

    if (curr_value < comp_val[hr_min_sec_csec]) 
    {
        curr_value++;
    }
    else
    {
        curr_value = 0;
        flag = hr_min_sec_csec + 1;
    }

    sw_values[hr_min_sec_csec] = curr_value;

    return flag    
}

function ConvretToString(value_to_convert) 
{
    if (value_to_convert <= 9)
    {
        return ("0" + value_to_convert.toString());
    }
    else
    {
        return value_to_convert.toString();
    }    
}