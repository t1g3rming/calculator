function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if(b === 0){
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

function modulus(a,b){
    return a % b;
}


function Calculate(prev, curr, op){
    switch(op){
        case "add":
            return add(prev, curr);
        case "subtract":
            return subtract(prev, curr);
        case "multiply":
            return multiply(prev, curr);
        case "divide":
            return divide(prev, curr);
        case "percent":
            return modulus(prev, curr);
        default:
            throw new Error("Unknown operator");
    }
}

let answer = null;
let curr = null;
let prevInput = "";
let deciClicked = false;
let numClicked = false;
let number = document.querySelectorAll(".btn-number"); 
number.forEach(function(btn){ //for each number button
    btn.addEventListener("click", function(){ //add event listener
        if(opClicked){
            document.querySelector(".currentInput").textContent = ""; //clear current input if operator was clicked
            opClicked = false;
            deciClicked = false;
            numClicked = false; //prevent multiple operator clicks

        
        }

        
        if (btn.id === "."){
            if(deciClicked){
                return; //prevent multiple decimals
            } else {
                deciClicked = true;
            }
        }
        document.querySelector(".currentInput").textContent += btn.id; //append clicked number to current input
       
        numClicked = true;
    })
});

let op = null;
let opClicked = false;
let operation = document.querySelectorAll(".btn-operator");
operation.forEach(function(btn){
    btn.addEventListener("click", function(){
        if (!numClicked){
            return; //prevent operator click if no number was clicked
        }
        if (prevInput !== ""){ //if there is a previous input, perform calculation
            
            let currentInput = Number(document.querySelector(".currentInput").textContent);
            answer = Calculate(prevInput, currentInput, op);
            document.querySelector(".currentInput").textContent = answer;
            prevInput = answer; //update prevInput to answer for chaining operations
            op = btn.id; 
            opClicked = true;
        } else { //if no previous input, just set operator
            prevInput = Number(document.querySelector(".currentInput").textContent);
            op = btn.id;
            opClicked = true;
        }   
    })
});

let del = document.getElementById("delete");
del.addEventListener("click", function(){
    let currentInput = document.querySelector(".currentInput").textContent;
    if (currentInput.slice(-1) === "."){
        deciClicked = false; //allow decimal again if last character was a decimal
    }
    document.querySelector(".currentInput").textContent = currentInput.slice(0, -1); //remove last character
});

let clr = document.getElementById("clear");
clr.addEventListener("click", function(){
    document.querySelector(".currentInput").textContent = ""; //clear current input
    prevInput = "";
    answer = null;
    op = null;
    opClicked = false;
    numClicked = false;
    deciClicked = false;
});

let eqClicked = false;
let eq = document.getElementById("equals");
eq.addEventListener("click", function(){
    if (prevInput === "" && !numClicked && eqClicked){
        return; //prevent equals click if no previous input or no number clicked or equals already clicked
    }
    let currentInput = Number(document.querySelector(".currentInput").textContent);
    answer = Calculate(prevInput, currentInput, op);
    document.querySelector(".currentInput").textContent = answer;
    prevInput = "";
    eqClicked = true; //prevent multiple equals clicks
});


//First, I defined basic arithmetic functions: add, subtract, multiply, divide, and modulus. Each function takes two arguments and returns the result of the operation. The divide function includes error handling for division by zero.

//Next, I created a Calculate function that takes two numbers and an operator as arguments. It uses a switch statement to call the appropriate arithmetic function based on the operator provided.

//I then set up event listeners for the number buttons. When a number button is clicked, it appends the number to the current input display. I also handled decimal point input to prevent multiple decimals in a single number.

//For the operator buttons, I added event listeners that store the current input as the previous input and set the selected operator. If there is already a previous input, it performs the calculation using the Calculate function and updates the display with the result.

//I implemented functionality for the delete button to remove the last character from the current input and for the clear button to reset all inputs and states.

//Finally, I added an event listener for the equals button to perform the final calculation when clicked, updating the display with the result and resetting necessary states to allow for new calculations.