const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const screen = document.querySelector('.screen');
const clearButton = document.querySelector('.btn-clear');
const deleteButton = document.querySelector('.btn-delete');
const validOperators = ["+", "-", "×", "÷"];

let firstOperand;
let secondOperand;
let selectedOperator = undefined;

function calculate() {
    let result = "";
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    if (selectedOperator === "+") {
        try {
            result = firstOperand + secondOperand;
        } catch (error) {
            result = "ERROR";
        }
    }else if (selectedOperator === "-") {
        try {
            result = firstOperand - secondOperand;
        } catch (error) {
            result = "ERROR";
        }
    }else if (selectedOperator === "×") {
        try {
            result = firstOperand * secondOperand;
        } catch (error) {
            result = "ERROR";
        }
    }else if (selectedOperator === "÷") {
        try {
            result = firstOperand / secondOperand;
        } catch (error) {
            result = "ERROR";
        }
    }else {
        result = "ERROR";
    }

    let roundedResult;
    if (Number.isFinite(result) && result % 1 !== 0) {
        const decimalPlaces = result.toString().split('.')[1].length;
        roundedResult = decimalPlaces > 5 ? parseFloat(result.toFixed(5)) : result;
    } else {
        roundedResult = result;
    }

    return roundedResult;
}

function clearOperands(){
    firstOperand = undefined;
    secondOperand = undefined;
}

function clearScreen() {
    screen.classList.remove('solution');
    clearOperands();
    screen.innerText = "0";
}

function clearOperators(op) {
    operators.forEach(operator => {
        if (operator != op) {
            operator.classList.remove('active-operator');
        }
    });
}

function clearAllOperators() {
    operators.forEach(operator => {
        operator.classList.remove('active-operator');
    });
    selectedOperator = undefined;
}

clearButton.addEventListener('click', clearScreen);
clearButton.addEventListener('click', clearAllOperators);

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        clearOperators(operator);
        operator.classList.add('active-operator');
        if (selectedOperator === undefined) {
            screen.innerText += ` ${operator.innerText}`;

        }
        selectedOperator = operator.innerText;
    });
});

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (screen.classList.contains('solution') || screen.innerText === "0") {
            screen.classList.remove('solution');
            screen.innerText = digit.innerText;
        } else if (validOperators.includes(screen.innerText[screen.innerText.length - 1])) {
            screen.innerText += " " + digit.innerText;
        } else {
            screen.innerText += digit.innerText;
        }

        if (selectedOperator === undefined) {
            if (firstOperand === undefined){
                firstOperand = digit.innerText;
            } else {
                firstOperand += digit.innerText;
            }      
        } else {
            if (secondOperand === undefined){
                secondOperand = digit.innerText;
            } else {
                secondOperand += digit.innerText;
            } 
        }
        console.log(firstOperand, secondOperand);
    });
});

equals.addEventListener('click', () => {
    if (selectedOperator !== undefined && firstOperand!== undefined && secondOperand!== undefined) {
        let solution = calculate();
        screen.innerText = solution;
        clearAllOperators();
        clearOperands();
        screen.classList.add('solution');
    }
});

function deleteLastDigit() {
    if (screen.innerText === "0") {
        return;
    }
    if (screen.innerText.length > 1) {
        if (validOperators.includes(screen.innerText[screen.innerText.length - 1])) {
            clearAllOperators();
        }
        screen.innerText = screen.innerText.slice(0, -1);
        
    } else {
        clearScreen();
    }

    if (selectedOperator === undefined) {
        if (firstOperand != undefined){
            if (firstOperand.length > 1){
            firstOperand = firstOperand.slice(0, -1);
            } else {
                firstOperand = undefined;
            }
        }      
    } else {
        if (secondOperand != undefined){
            if (secondOperand.length > 1){
                secondOperand = secondOperand.slice(0, -1);
            } else {
                secondOperand = undefined;
            }
        } 
    }

    console.log(firstOperand, secondOperand);
}

deleteButton.addEventListener('click', deleteLastDigit);