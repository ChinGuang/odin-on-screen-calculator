import { CalculatorSystem } from "./calculator-system.js";

const calculatorMemory = {
    firstNumber: '',
    operation: undefined,
    secondNumber: ''
}

const displayComponent = document.querySelector("#display-board");
const displayOperatorComponent = document.querySelector('#display-operator');

function insertNumber(num) {
    if (calculatorMemory.operation === undefined) {
        calculatorMemory.firstNumber = (+(calculatorMemory.firstNumber + num)).toString();
    } else {
        calculatorMemory.secondNumber = (+(calculatorMemory.secondNumber + num)).toString();
    }
    setDisplayNumber();
}

function insertOperator(operator) {
    switch (operator) {
        case CalculatorSystem.CalculatorOperation.EQUAL:
            break;
        case CalculatorSystem.CalculatorOperation.CLEAR:
            break;
        case CalculatorSystem.CalculatorOperationUI.ADD:
            calculatorMemory.operation = operator;
            setDisplayOperator();
            break;
        case CalculatorSystem.CalculatorOperationUI.SUB:
            calculatorMemory.operation = CalculatorSystem.CalculatorOperation.SUB;
            setDisplayOperator();
            break;
        case CalculatorSystem.CalculatorOperationUI.MUL:
            calculatorMemory.operation = CalculatorSystem.CalculatorOperation.MUL;
            setDisplayOperator();
            break;
        case CalculatorSystem.CalculatorOperationUI.DIV:
            calculatorMemory.operation = CalculatorSystem.CalculatorOperation.DIV;
            setDisplayOperator();
            break;
    }
};

function setDisplayNumber() {
    if (calculatorMemory.operation === undefined) {
        displayComponent.textContent = calculatorMemory.firstNumber || 0;
    } else {
        displayComponent.textContent = calculatorMemory.secondNumber || 0;
    }
}

function setDisplayOperator() {
    displayOperatorComponent.textContent = CalculatorSystem.CalculatorOperationUIMapping[calculatorMemory.operation] ?? '';
    setDisplayNumber();
}

const digitButtons = document.querySelectorAll(".digit-button");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => {
        const digit = e.target.textContent;
        insertNumber(+digit);
    })
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", (e) => {
        const operator = e.target.textContent;
        insertOperator(operator);
    })
})