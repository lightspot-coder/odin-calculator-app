const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const displayContent = document.createElement("p");
const eraseButtons = document.querySelector("#eraseButtons");

displayContent.setAttribute("id","displayContent");
display.appendChild(displayContent);

let firstOperand = "";
let secondOperand = "";
let result = "";
let operator = "";
let currentDisplayOperand = 1;


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

    console.log(`inside operate: currentOperator=${currentOperator} a=${a} b=${b}`);
    if(a === "" && currentOperator !== ""){
        console.log("first operand missing");
        return "";
    }
    else if(a !== "" && b === "" && currentOperator === "="){
        console.log("same operand");
        return a;
    }
    else if(a !== "" && b === "" && currentOperator !== "=" ){

        console.log("waiting for the second operand");
        currentDisplayOperand = 2;
        return "";
    }
    else if(a !== "" && b !== "" && currentOperator !== ""){
        
        if(operator === "sum"){
            console.log("calling sum function");
            result = sum(a,b);

        }
        else if(operator === "subs"){
            console.log("calling substract function");
            result = substract(a,b);

        }
        else if(operator === "div"){
            console.log("calling divide function");
            result = divide(a,b);
        }
        else if(operator === "mult"){
            console.log("calling multiply function");
            result = multiply(a,b);
        }
        else{
            result = firstOperand;
        }
        firstOperand = result;
        secondOperand = "";
        operator = "";
        currentDisplayOperand = 1;

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
            
            if(currentDisplayOperand === 1){
                if(firstOperand === "0")
                    firstOperand = "";
                firstOperand = firstOperand + currentButton.getAttribute("value");
                showOnDisplay(firstOperand);
                //currentDisplayOperand = 2;
            }
            if(currentDisplayOperand === 2){
                if(secondOperand === "0")
                    secondOperand = "";
                secondOperand = secondOperand + currentButton.getAttribute("value");
                showOnDisplay(secondOperand);
                //currentDisplayOperand = 1;
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

    if(currentDisplayOperand === 1){
        if(firstOperand !== "0")
            firstOperand = firstOperand + 0;
        showOnDisplay(firstOperand);
        //currentDisplayOperand = 2;
    }
        
    if(currentDisplayOperand === 2){
         if(secondOperand !== "0")
            secondOperand = secondOperand + 0;
        showOnDisplay(secondOperand);
        //currentDisplayOperand = 1;
    }
    console.log(`inside 0 button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);
    
});

// making text for operator and specials buttons

// divide button

let textButton2 = document.createElement("p");
textButton2.textContent = "/";
document.getElementById(`button03`).appendChild(textButton2);
document.getElementById(`button03`).setAttribute("name","button/");
document.getElementById(`button03`).addEventListener("click",() => {

     
    operator = "div";
    showOnDisplay(operate(operator, firstOperand, secondOperand));
    
});

// multiply button

let textButton3 = document.createElement("p");
textButton3.textContent = "*";
document.getElementById(`button13`).appendChild(textButton3);
document.getElementById(`button13`).setAttribute("name","button*");
document.getElementById(`button13`).addEventListener("click",() =>{

    operator = "mult";
    showOnDisplay(operate(operator, firstOperand, secondOperand));
    

});

// substract button

let textButton4 = document.createElement("p");
textButton4.textContent = "-";
document.getElementById(`button23`).appendChild(textButton4);
document.getElementById(`button23`).setAttribute("name","button-");
document.getElementById(`button23`).addEventListener("click",() => {
    
    operator = "subs";
    showOnDisplay(operate(operator, firstOperand, secondOperand));
});

// addition buttons

let textButton5 = document.createElement("p");
textButton5.textContent = "+";
document.getElementById(`button33`).appendChild(textButton5);
document.getElementById(`button33`).setAttribute("name","button+");
document.getElementById(`button33`).addEventListener("click",() => {

    
    operator = "sum";
    showOnDisplay(operate(operator, firstOperand, secondOperand));
        

});

// '=' operator

let textButton6 = document.createElement("p");
textButton6.textContent = "=";
document.getElementById(`button32`).appendChild(textButton6);
document.getElementById(`button32`).setAttribute("name","button=");
document.getElementById(`button32`).addEventListener("click",() => {
    
    showOnDisplay(operate("=", firstOperand, secondOperand))
});

// decimal operator

let textButton7 = document.createElement("p");
textButton7.textContent = ".";
document.getElementById(`button30`).appendChild(textButton7);
document.getElementById(`button30`).setAttribute("name","button.");
document.getElementById(`button30`).addEventListener("click",() => {

    if(currentDisplayOperand === 0){
        console.log("inside firt if in decimal button");
        firstOperand = "0.";
        showOnDisplay(firstOperand);
    }
    if(currentDisplayOperand === 1){
        if(!firstOperand.includes(".")){
            firstOperand = firstOperand + ".";
            showOnDisplay(firstOperand);
        }
            
    }   
    if(currentDisplayOperand === 2){
        if(!secondOperand.includes(".")){
            secondOperand = secondOperand + ".";
            showOnDisplay(secondOperand);
        }  
    }
    console.log(`inside decimal button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);
});

// create 2 buttons for erase all and delete 1 digit

const allClearButton = document.createElement("button");
allClearButton.textContent = "AC";
allClearButton.classList.add("button");
allClearButton.addEventListener("click",() => {

        firstOperand = "";
        secondOperand = "";
        result = "";
        operator = "";
        currentDisplayOperand = 1;
        showOnDisplay("");
        console.log(`inside all clear button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);

});

const deleteDigitButton = document.createElement("button");
deleteDigitButton.textContent = "DEL";
deleteDigitButton.classList.add("button");
deleteDigitButton.addEventListener("click",() => {
   
    
    if(currentDisplayOperand === 1){
        let aux = firstOperand.slice(0,-1);
        firstOperand = aux;
        showOnDisplay(firstOperand);
    }
    if(currentDisplayOperand === 2){
        let aux = secondOperand.slice(0,-1);
        secondOperand = aux;
        showOnDisplay(secondOperand);
    }
    console.log(`currentDisplayOperand = ${currentDisplayOperand}`);
    console.log(`inside deleteDigitButton event  firstOperand = ${firstOperand} secondOperand ${secondOperand}  `);
});


eraseButtons.appendChild(allClearButton);
eraseButtons.appendChild(deleteDigitButton);

