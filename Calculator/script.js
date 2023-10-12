var Total=0;

var buffer="0";

var TpreviousControl;


const screen= document.querySelector('.screen');


function buttonClick(value){

    if(isNaN(value)){

        handlelogo(value);

    }

    else{

        handleNumber(value);

    }
    screen.innerText=buffer;

}

function handlelogo(logo){

    switch(logo){

        case 'C':

          buffer='0';

          Total=0;

          break;

        case '=':

            if(TpreviousControl===null){

                return;

            }
            flushOperation(parseInt(buffer));

            TpreviousControl=null;

            buffer=Total;

            Total=0;

            break;

        case '←':

            if(buffer.length ===1){

                buffer='0';

            }
            else{

                buffer=buffer.substring(0,buffer.length - 1);

            }
            break;
        case '+':

        case '−':

        case '×':

        case '÷':

            handleMathData(logo);

            break;
    }
}
function handleMathData(logo){
    if(buffer === '0'){
        return;
    }
    const intCount = parseInt(buffer);
    if(Total ===0){
        Total = intCount;
    }
    else{
        flushOperation(intCount);
    }
    TpreviousControl = logo;
    buffer = '0';
}

function flushOperation(intCount){
    if(TpreviousControl === '+'){
        Total += intCount;
    }
    else if(TpreviousControl === '−'){
        Total-=intCount;
    } 
    else if(TpreviousControl === '×'){
        Total*= intCount;
    }
    else if(TpreviousControl === '÷'){
        Total/= intCount;
    }      
}

function handleNumber(numstr){
    if(buffer ==='0'){
        buffer = numstr;
    } else{
        buffer+= numstr;
    }
}

function init_num(){
  document.querySelector('.calc-buttons').addEventListener('click',function(event){
    buttonClick(event.target.innerText);
  })
}

init_num();

