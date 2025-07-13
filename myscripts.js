const container = document.querySelector("#container");
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
const displayFirstText = document.createElement("div");
const displaySecondText= document.createElement("div");
displayFirstText.setAttribute("id","displayFirstText");
displayFirstText.setAttribute("style","font-size:150%;color:black;");
displaySecondText.setAttribute("id","displaySecondText");
displaySecondText.setAttribute("style","font-size:250%;color:black;");
display.appendChild(displayFirstText);
display.appendChild(displaySecondText);
const eraseButtons = document.querySelector("#eraseButtons");

let firstOperand = "";
let secondOperand = "";
let firstOperandLenght = 0;
let secondOperandLenght = 0;
let result = "";
let operator = "";
let currentDisplayOperand = 1;
let firstStringOnDisplay = "Operation";
const maxLengthOfNumberDisplay = 15;



function sum(a,b){
    return `${(+(+a + +b).toFixed(3))}`;
}

function substract(a,b){
    return `${(+(+a - +b).toFixed(3))}`;
}

function divide(a,b){
    if(+b === 0){
        alert("You can't divide by zero!");
        return "0";
    }
    else
        return `${(+(+a / +b).toFixed(3))}`;
}

function multiply(a,b){
    return `${(+(+a * +b).toFixed(3))}`;
}


function operate(currentOperator, a, b){

    //console.log(`inside operate: operator= ${operator} currentOperator=${currentOperator} a=${a} b=${b}`);
    if(a === "" && currentOperator !== ""){
        //console.log("first operand missing");
        return "";
    }
    else if(a !== "" && b === "" && currentOperator === "="){
        //console.log("same operand");
        return a;
    }
    else if(a !== "" && b === "" && currentOperator !== "=" ){

        //console.log("waiting for the second operand");
        console.log(`second operator missing: a ${currentOperator} `);
        firstStringOnDisplay = `${a} ${currentOperator}`;
        operator = currentOperator;
        currentDisplayOperand = 2;
        return "";
    }
    else if(a !== "" && b !== "" && operator !== "" && currentOperator !== ""){
        
        
        if(operator === "+"){
            result = sum(a,b);
        }
        if(operator === "-"){
            result = substract(a,b);
        }
        if(operator === "/"){
            result = divide(a,b);
        }
        if(operator === "*"){
            result = multiply(a,b);
        }
        if(currentOperator === "="){

            firstOperand = result;
            if(result.length > maxLengthOfNumberDisplay) // don't overflow decimal
                firstOperand = (+result).toExponential(3);
            firstOperandLenght = firstOperand.length;
            secondOperand = "";
            secondOperandLenght = 0;
            
            currentDisplayOperand = 1;
            console.log(`normal operation: a ${operator} b ${currentOperator} c`);
            firstStringOnDisplay = `${a} ${operator} ${b} ${currentOperator}`;
            operator = "";
            console.log(`${a} + ${b} = ${result}`);
            return firstOperand;
        }
        firstOperand = result;
        if(result.length > maxLengthOfNumberDisplay) // don't overflow decimal
            firstOperand = (+result).toExponential(3);
        firstOperandLenght = firstOperand.length;
        secondOperand = "";
        secondOperandLenght = 0;
        currentDisplayOperand = 2;
        console.log(`chain operation: a ${operator} b ${currentOperator} c`);
        firstStringOnDisplay = `${result} ${currentOperator}`;
        operator = currentOperator;
        console.log(`${result} ${operator}`);
        

    }
    firstOperand = result;
    if(result.length > maxLengthOfNumberDisplay) // don't overflow decimal
            firstOperand = (+result).toExponential(3);
    return firstOperand;
}

function maxLenghtOfNumber(currentNumber, newDigit){


    if(currentDisplayOperand === 1){
        if(firstOperandLenght < maxLengthOfNumberDisplay){
            firstOperandLenght += 1;
            return currentNumber + newDigit;
        }
    }
    if(currentDisplayOperand === 2){
         if(secondOperandLenght < maxLengthOfNumberDisplay){
            secondOperandLenght += 1;
            return currentNumber + newDigit;
        }
    }
    return currentNumber;


}

function showOnDisplay(num){
    
    (document.getElementById("displayFirstText")).textContent = `${firstStringOnDisplay}`;
    (document.getElementById("displaySecondText")).textContent = `${num}`;
    
}

function deleteDigit(){
    if(currentDisplayOperand === 1){
        let aux = firstOperand.slice(0,-1);
        firstOperand = aux;
        if(firstOperandLenght > 0)
            firstOperandLenght -= 1;
        showOnDisplay(firstOperand);
    }
    if(currentDisplayOperand === 2){
        let aux = secondOperand.slice(0,-1);
        secondOperand = aux;
        if(secondOperandLenght > 0)
            secondOperandLenght -= 1;
        showOnDisplay(secondOperand);
    }
    
    //console.log(`inside deleteDigit function firstOperand = ${firstOperand} secondOperand ${secondOperand}  `);
}

function addNewDigit(newDigit){

    if(currentDisplayOperand === 1){
        if(firstOperand !== "0")
            firstOperand = maxLenghtOfNumber(firstOperand,newDigit);
        else
            firstOperand = "" + newDigit;
        showOnDisplay(firstOperand);
        
    }
        
    if(currentDisplayOperand === 2){
        if(secondOperand !== "0")
            secondOperand = maxLenghtOfNumber(secondOperand,newDigit);
        else
            secondOperand = "" + newDigit;
        showOnDisplay(secondOperand);
    }
    //console.log(`inside addNewDigit:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);

}
function clearAll(){
   
    firstOperand = "";
    secondOperand = "";
    firstOperandLenght = 0;
    secondOperandLenght = 0;
    result = "";
    operator = "";
    currentDisplayOperand = 1;
    firstStringOnDisplay = "Operation";
    showOnDisplay("");
}

function addDot(){

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
    //console.log(`inside decimal button function:  currentDisplayOperand = ${currentDisplayOperand} firstOperand = ${firstOperand} secondOperand = ${secondOperand}  `);

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

        let currentButton = document.getElementById(`button${i}${j}`);
        currentButton.setAttribute("name",`button${currentNumber}`);
        currentButton.setAttribute("value",`${currentNumber}`);
        currentButton.textContent = `${currentNumber}`;
        currentButton.addEventListener("click",() => {
           addNewDigit(currentButton.getAttribute("value"));
        });

        currentNumber += 1;
    }
}

// making text for button 0

let auxButton = document.getElementById(`button31`);
auxButton.classList.add("button");
auxButton.textContent = "0";
auxButton.setAttribute("name","button0")
auxButton.addEventListener("click",() => addNewDigit("0"));

// divide button

auxButton = document.getElementById(`button03`);
auxButton.classList.add("button");
auxButton.setAttribute("name","button/");
auxButton.classList.add("button");
auxButton.textContent = "/";
auxButton.addEventListener("click",() => {

    showOnDisplay(operate("/", firstOperand, secondOperand));
    
});

// multiply button

auxButton = document.getElementById(`button13`);
auxButton.classList.add("button");
auxButton.textContent = "*";
auxButton.setAttribute("name","button*");
auxButton.addEventListener("click",() =>{

    showOnDisplay(operate("*", firstOperand, secondOperand));

});

// substract button

auxButton = document.getElementById(`button23`);
auxButton.classList.add("button");
auxButton.textContent = "-";
auxButton.setAttribute("name","button-");
auxButton.addEventListener("click",() => {
    
    showOnDisplay(operate("-", firstOperand, secondOperand));
});

// addition button
auxButton = document.getElementById(`button33`);
auxButton.classList.add("button");
auxButton.textContent = "+";
auxButton.setAttribute("name","button+");
auxButton.addEventListener("click",() => {

    showOnDisplay(operate("+", firstOperand, secondOperand)); 

});

// '=' operator

auxButton = document.getElementById(`button32`);
auxButton.classList.add("button");
auxButton.textContent = "=";
auxButton.setAttribute("name","button=");
auxButton.addEventListener("click",() => {
    
    showOnDisplay(operate("=", firstOperand, secondOperand))
});

// decimal "." operator

auxButton = document.getElementById(`button30`);
auxButton.classList.add("button");
auxButton.textContent = ".";
auxButton.setAttribute("name","button.");
auxButton.addEventListener("click",() => addDot() );


// AC button

const allClearButton = document.createElement("button");
allClearButton.textContent = "AC";
allClearButton.setAttribute("style","font-size:150%; color:white;");
allClearButton.classList.add("button");
allClearButton.addEventListener("click",() => clearAll() );


// DEL button

const deleteDigitButton = document.createElement("button");
deleteDigitButton.textContent = "DEL";
deleteDigitButton.setAttribute("style","font-size:150%;color:white;");
deleteDigitButton.classList.add("button");
deleteDigitButton.addEventListener("click",() => deleteDigit() );
eraseButtons.appendChild(allClearButton);
eraseButtons.appendChild(deleteDigitButton);

// keyboard support

document.addEventListener("keydown",(event) =>{

    document.activeElement.blur(); // remove focus if some button was clicked
    
    switch(event.key){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
             console.log(`keyboard:${event.key}`);
             addNewDigit(event.key);
             break;
        case "Backspace":
             console.log(`keyboard:${event.key}`);
             deleteDigit();
             break;
        case "Enter":
             console.log(`keyboard:${event.key}`);
             showOnDisplay(operate("=", firstOperand, secondOperand));
             break;
        case "+":
             console.log(`keyboard:${event.key}`);
             showOnDisplay(operate("sum", firstOperand, secondOperand));
             break;
        case "-":
             console.log(`keyboard:${event.key}`);
             showOnDisplay(operate("subs", firstOperand, secondOperand));
             break;
        case "*":
             console.log(`keyboard:${event.key}`);
             showOnDisplay(operate("mult", firstOperand, secondOperand));
             break;
        case "/":
             console.log(`keyboard:${event.key}`);
             showOnDisplay(operate("div", firstOperand, secondOperand));
             break;
        case ".":
             console.log(`keyboard:${event.key}`);
             addDot();
             break;
        case "Delete":
             console.log(`keyboard:${event.key}`);
             clearAll();
             break;


    }
});

