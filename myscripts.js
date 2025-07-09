const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const displayContent = document.createElement("p");
displayContent.setAttribute("id","displayContent");
display.appendChild(displayContent);

let firstOperand = "";
let secondOperand = "";
let result = "";
let operator = "";
let displayContentIsEmpty = true;


function sum(a,b){
    return `${+a + +b}`;
}

function substract(a,b){
    return `${+a - +b}`;
}

function divide(a,b){
    if(+b === 0){
        alert("You can't divide by zero!");
        return "0";
    }
    else
        return `${+a / +b}`;
}

function multiply(a,b){
    return `${+a * +b}`;
}

function operate(currentOperator, a, b){
    
    console.log(`inside of operate: operator = ${operator}  firstOperand = ${firstOperand}  secondOperand = ${secondOperand}`);
    
    if(firstOperand !== "" && secondOperand !== "" && currentOperator !== ""){
        
        if(currentOperator === "sum"){
            console.log("calling sum function");
            result = sum(a,b);

        }
        else if(currentOperator === "subs"){
            console.log("calling substract function");
            result = substract(a,b);

        }
        else if(currentOperator === "div"){
            console.log("calling divide function");
            result = divide(a,b);
        }
        else if(currentOperator === "mult"){
            console.log("calling multiply function");
            result = multiply(a,b);
        }
        else{
            console.log("Another operation")
        }
        firstOperand = result; 
        secondOperand = "";
        operator = "";

    }
    else{
        alert("something missing");
    }
     
    return result;
}

function showOnDisplay(num){
    
   
    (document.getElementById("displayContent")).textContent = `${num}`;
    
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
        const currentButton = document.getElementById(`button${i}${j}`);
        currentButton.appendChild(textButton);
        currentButton.setAttribute("name",`button${currentNumber}`);
        currentButton.setAttribute("value",`${currentNumber}`);
        // making call to the event when select a number

        document.getElementById(`button${i}${j}`).addEventListener("click",() => {
            
            if(operator === ""){
                firstOperand = firstOperand + currentButton.getAttribute("value");
                showOnDisplay(firstOperand);
            }
            else{
                secondOperand = secondOperand + currentButton.getAttribute("value");
                showOnDisplay(secondOperand);
            }
        
        });

        currentNumber += 1;
    }
}

// making text for button 0
let textButton1 = document.createElement("p");
textButton1.textContent = 0;
document.getElementById(`button31`).appendChild(textButton1);
document.getElementById(`button31`).setAttribute("name","button0")
document.getElementById(`button31`).addEventListener("click",() => {

    if(operator === ""){
        firstOperand = firstOperand + 0;
        showOnDisplay(firstOperand);
    }
        
    else{
        secondOperand = secondOperand + 0;
        showOnDisplay(secondOperand);
    }
    
});

// making text for operator and specials buttons

// divide button

let textButton2 = document.createElement("p");
textButton2.textContent = "/";
document.getElementById(`button03`).appendChild(textButton2);
document.getElementById(`button03`).setAttribute("name","button/");
document.getElementById(`button03`).addEventListener("click",() => operator = "div");

// multiply button

let textButton3 = document.createElement("p");
textButton3.textContent = "*";
document.getElementById(`button13`).appendChild(textButton3);
document.getElementById(`button13`).setAttribute("name","button*");
document.getElementById(`button13`).addEventListener("click",() => operator = "mult");

// substract button

let textButton4 = document.createElement("p");
textButton4.textContent = "-";
document.getElementById(`button23`).appendChild(textButton4);
document.getElementById(`button23`).setAttribute("name","button-");
document.getElementById(`button23`).addEventListener("click",() => operator = "subs");

// addition buttons

let textButton5 = document.createElement("p");
textButton5.textContent = "+";
document.getElementById(`button33`).appendChild(textButton5);
document.getElementById(`button33`).setAttribute("name","button+");
document.getElementById(`button33`).addEventListener("click",() => operator = "sum");

// '=' operator

let textButton6 = document.createElement("p");
textButton6.textContent = "=";
document.getElementById(`button32`).appendChild(textButton6);
document.getElementById(`button32`).setAttribute("name","button=");
document.getElementById(`button32`).addEventListener("click",() => showOnDisplay(operate(operator, firstOperand, secondOperand)));

// decimal operator

let textButton7 = document.createElement("p");
textButton7.textContent = ".";
document.getElementById(`button30`).appendChild(textButton7);
document.getElementById(`button30`).setAttribute("name","button.");

// getElementsByName return a array of nodes, where first element is the element itself in the DOM

//console.log(document.getElementsByName("button.")[0]); 

