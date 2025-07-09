const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

let firstOperand = null;
let SecondOperand = null;
let operator = null;
let displayContentIsEmpty = true;


function sum(a,b){
    return a + b;
}

function operate(operator, a, b){
    if(operator === "sum"){
        console.log("calling sum function");
        return sum(a,b);    
    }
    else{
        console.log("Another operation")
    }
    return 0;
}

function showOnDisplay(num){
    console.log(num);
    if(!displayContentIsEmpty){

       
        const child = document.getElementById("displayContent");
        display.removeChild(child); 
        
    }
    let displayContent = document.createElement("p");
    displayContent.textContent = num;
    displayContent.setAttribute("id","displayContent");
    display.appendChild(displayContent);

    displayContentIsEmpty = false;
    
    
}

// make all the buttons
for(let i = 0; i < 4; i++){
    
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("buttonRow");

    for(let j = 0; j < 4; j++){

        let button = document.createElement("button");
        button.setAttribute("id",`button${i}${j}`);
        buttonRow.appendChild(button);
    }
    buttons.appendChild(buttonRow);
}

// making text for buttons from 1 to 9

let currentNumber = 1;
for(let i = 2; i >= 0; i--){
    for(let j = 0; j < 3; j++){

        let textButton = document.createElement("p");
        textButton.textContent = currentNumber;
        document.getElementById(`button${i}${j}`).appendChild(textButton);
        document.getElementById(`button${i}${j}`).setAttribute("name",`button${currentNumber}`);
        
        // making call to the event when select a number

        document.getElementById(`button${i}${j}`).addEventListener("click",showOnDisplay(currentNumber));

        currentNumber += 1;
    }
}

// making text for button 0
let textButton1 = document.createElement("p");
textButton1.textContent = 0;
document.getElementById(`button31`).appendChild(textButton1);
document.getElementById(`button31`).setAttribute("name","button0")
document.getElementById(`button31`).addEventListener("click",showOnDisplay(0));

// making text for operator and specials buttons

// divide button

let textButton2 = document.createElement("p");
textButton2.textContent = "/";
document.getElementById(`button03`).appendChild(textButton2);
document.getElementById(`button03`).setAttribute("name","button/");
document.getElementById(`button03`).addEventListener("click",() => {
            alert("I'm / operator");
});

// multiply button

let textButton3 = document.createElement("p");
textButton3.textContent = "*";
document.getElementById(`button13`).appendChild(textButton3);
document.getElementById(`button13`).setAttribute("name","button*");

// substract button

let textButton4 = document.createElement("p");
textButton4.textContent = "-";
document.getElementById(`button23`).appendChild(textButton4);
document.getElementById(`button23`).setAttribute("name","button-");

// addition buttons

let textButton5 = document.createElement("p");
textButton5.textContent = "+";
document.getElementById(`button33`).appendChild(textButton5);
document.getElementById(`button33`).setAttribute("name","button+");

// '=' operator

let textButton6 = document.createElement("p");
textButton6.textContent = "=";
document.getElementById(`button32`).appendChild(textButton6);
document.getElementById(`button32`).setAttribute("name","button=");

// decimal operator

let textButton7 = document.createElement("p");
textButton7.textContent = ".";
document.getElementById(`button30`).appendChild(textButton7);
document.getElementById(`button30`).setAttribute("name","button.");

// getElementsByName return a array of nodes, where first element is the element itself in the DOM

//console.log(document.getElementsByName("button.")[0]); 

