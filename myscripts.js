const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const displayContent = document.createElement("p");
const eraseButtons = document.querySelector("#eraseButtons");

displayContent.setAttribute("id","displayContent");
displayContent.setAttribute("style","font-size:200%;color:black;");
display.appendChild(displayContent);

let firstOperand = "";
let secondOperand = "";
let firstOperandLenght = 0;
let secondOperandLenght = 0;
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
        operator = currentOperator;
        currentDisplayOperand = 2;
        return "";
    }
    else if(a !== "" && b !== "" && operator !== "" && currentOperator !== ""){
        
        
        if(operator === "sum"){
            console.log("calling sum function");
            result = sum(a,b);

        }
        if(operator === "subs"){
            console.log("calling substract function");
            result = substract(a,b);

        }
        if(operator === "div"){
            console.log("calling divide function");
            result = divide(a,b);
        }
        if(operator === "mult"){
            console.log("calling multiply function");
            result = multiply(a,b);
        }
        if(currentOperator === "="){
            console.log("normal operation with =operator");
            firstOperand = result;
            secondOperand = "";
            secondOperandLenght = 0;
            operator = "";
            currentDisplayOperand = 1;
            return result;
        }
        firstOperand = result;
        secondOperand = "";
        secondOperandLenght = 0;
        currentDisplayOperand = 1;
        operator = currentOperator;
        currentDisplayOperand = 2;
        console.log("chain operation, waiting for second number");
        

    }
    return result;
}

function maxLenghtOfNumber(currentNumber, newDigit){


    if(currentDisplayOperand === 1){
        if(firstOperandLenght < 15){
            firstOperandLenght += 1;
            return currentNumber + newDigit;
        }
    }
    if(currentDisplayOperand === 2){
         if(secondOperandLenght < 15){
            secondOperandLenght += 1;
            return currentNumber + newDigit;
        }
    }
    return currentNumber;


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
        button.classList.add("button");
        buttonRow.appendChild(button);
    }
    buttons.appendChild(buttonRow);
}

// making text for buttons from 1 to 9

let currentNumber = 1;
for(let i = 2; i >= 0; i--){
    for(let j = 0; j < 3; j++){

        //let textButton = document.createElement("p");
        //textButton.textContent = currentNumber;
       // textButton.setAttribute("style","font-size:150%;");
        //textButton.classList.add("buttonText");
        const currentButton = document.getElementById(`button${i}${j}`);
       
        //currentButton.appendChild(textButton);
        currentButton.setAttribute("name",`button${currentNumber}`);
        currentButton.setAttribute("value",`${currentNumber}`);
        currentButton.textContent = `${currentNumber}`;
        // making call to the event when select a number

        document.getElementById(`button${i}${j}`).addEventListener("click",() => {
            
            if(currentDisplayOperand === 1){
                if(firstOperand === "0")
                    firstOperand = "";
                //firstOperand = firstOperand + currentButton.getAttribute("value");
                firstOperand = maxLenghtOfNumber(firstOperand,currentButton.getAttribute("value"));
                showOnDisplay(firstOperand);
                //currentDisplayOperand = 2;
            }
            if(currentDisplayOperand === 2){
                if(secondOperand === "0")
                    secondOperand = "";
                //secondOperand = secondOperand + currentButton.getAttribute("value");
                secondOperand = maxLenghtOfNumber(secondOperand,currentButton.getAttribute("value"));
                showOnDisplay(secondOperand);
                //currentDisplayOperand = 1;
            }
        
        });

        currentNumber += 1;
    }
}

// making text for button 0
//let textButton1 = document.createElement("p");
//textButton1.textContent = 0;
//textButton1.classList.add("button");
let auxButton = document.getElementById(`button31`);
auxButton.classList.add("button");
auxButton.textContent = "0";
//document.getElementById(`button31`).appendChild(textButton1);
auxButton.setAttribute("name","button0")
auxButton.addEventListener("click",() => {

    if(currentDisplayOperand === 1){
        if(firstOperand !== "0")
            //firstOperand = firstOperand + 0;
            firstOperand = maxLenghtOfNumber(firstOperand,"0");
        showOnDisplay(firstOperand);
        //currentDisplayOperand = 2;
    }
        
    if(currentDisplayOperand === 2){
         if(secondOperand !== "0")
            //secondOperand = secondOperand + 0;
            secondOperand = maxLenghtOfNumber(secondOperand,"0");
        showOnDisplay(secondOperand);
        //currentDisplayOperand = 1;
    }
    console.log(`inside 0 button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);
    
});

// making text for operator and specials buttons

// divide button

auxButton = document.getElementById(`button03`);
auxButton.classList.add("button");
auxButton.setAttribute("name","button/");
auxButton.classList.add("button");
auxButton.textContent = "/";
auxButton.addEventListener("click",() => {

     
    //operator = "div";
    showOnDisplay(operate("div", firstOperand, secondOperand));
    
});

// multiply button

auxButton = document.getElementById(`button13`);
auxButton.classList.add("button");
auxButton.textContent = "*";
auxButton.setAttribute("name","button*");
auxButton.addEventListener("click",() =>{

    //operator = "mult";
    showOnDisplay(operate("mult", firstOperand, secondOperand));
    

});

// substract button

auxButton = document.getElementById(`button23`);
auxButton.classList.add("button");
auxButton.textContent = "-";
auxButton.setAttribute("name","button-");
auxButton.addEventListener("click",() => {
    
    //operator = "subs";
    showOnDisplay(operate("subs", firstOperand, secondOperand));
});

// addition buttons
auxButton = document.getElementById(`button33`);
auxButton.classList.add("button");
auxButton.textContent = "+";
auxButton.setAttribute("name","button+");
auxButton.addEventListener("click",() => {

    
    //operator = "sum";
    showOnDisplay(operate("sum", firstOperand, secondOperand));
        

});

// '=' operator

auxButton = document.getElementById(`button32`);
auxButton.classList.add("button");
auxButton.textContent = "=";
auxButton.setAttribute("name","button=");
auxButton.addEventListener("click",() => {
    
    showOnDisplay(operate("=", firstOperand, secondOperand))
});

// decimal operator

auxButton = document.getElementById(`button30`);
auxButton.classList.add("button");
auxButton.textContent = ".";
auxButton.setAttribute("name","button.");
auxButton.addEventListener("click",() => {


    if(currentDisplayOperand === 1){
        if(!firstOperand.includes(".")){
            if(firstOperand === "")
                firstOperand = "0";
            firstOperand = firstOperand + ".";
            showOnDisplay(firstOperand);
        }
            
    }   
    if(currentDisplayOperand === 2){
        if(!secondOperand.includes(".")){
            if(secondOperand === "")
                secondOperand = "0";
            secondOperand = secondOperand + ".";
            showOnDisplay(secondOperand);
        }  
    }
    console.log(`inside decimal button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);
});

// create 2 buttons for erase all and delete 1 digit

const allClearButton = document.createElement("button");
allClearButton.textContent = "AC";
allClearButton.setAttribute("style","font-size:150%; color:white;");
allClearButton.classList.add("button");
allClearButton.addEventListener("click",() => {

        firstOperand = "";
        secondOperand = "";
        firstOperandLenght = 0;
        secondOperandLenght = 0;
        result = "";
        operator = "";
        currentDisplayOperand = 1;
        showOnDisplay("");
        console.log(`inside all clear button event:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);

});

const deleteDigitButton = document.createElement("button");
deleteDigitButton.textContent = "DEL";
deleteDigitButton.setAttribute("style","font-size:150%;color:white;");
deleteDigitButton.classList.add("button");
deleteDigitButton.addEventListener("click",() => {
   
    
    if(currentDisplayOperand === 1){
        let aux = firstOperand.slice(0,-1);
        firstOperand = aux;
        firstOperandLenght -= 1;
        showOnDisplay(firstOperand);
    }
    if(currentDisplayOperand === 2){
        let aux = secondOperand.slice(0,-1);
        secondOperand = aux;
        secondOperandLenght -= 1;
        showOnDisplay(secondOperand);
    }
    console.log(`currentDisplayOperand = ${currentDisplayOperand}`);
    console.log(`inside deleteDigitButton event  firstOperand = ${firstOperand} secondOperand ${secondOperand}  `);
});


eraseButtons.appendChild(allClearButton);
eraseButtons.appendChild(deleteDigitButton);

