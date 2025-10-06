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
        setDisplayNumber(calculatorMemory.firstNumber);
    } else {
        calculatorMemory.secondNumber = (+(calculatorMemory.secondNumber + num)).toString();
        setDisplayNumber(calculatorMemory.secondNumber);
    }
}

function insertOperator(operator) {
    switch (operator) {
        case CalculatorSystem.CalculatorOperation.EQUAL:
            calculatorMemory.firstNumber = +(CalculatorSystem.operate(calculatorMemory.operation, calculatorMemory.firstNumber, calculatorMemory.secondNumber)) ?? '';
            calculatorMemory.operation = undefined;
            calculatorMemory.secondNumber = ''
            setDisplayNumber(calculatorMemory.firstNumber);
            setDisplayOperator();
            break;
        case CalculatorSystem.CalculatorOperation.CLEAR:
            break;
        case CalculatorSystem.CalculatorOperationUI.ADD:
        case CalculatorSystem.CalculatorOperationUI.SUB:
        case CalculatorSystem.CalculatorOperationUI.MUL:
        case CalculatorSystem.CalculatorOperationUI.DIV:
            if (!!calculatorMemory.operation) {
                calculatorMemory.firstNumber = +(CalculatorSystem.operate(calculatorMemory.operation, calculatorMemory.firstNumber, calculatorMemory.secondNumber)) ?? '';
                calculatorMemory.secondNumber = ''
                setDisplayNumber(calculatorMemory.firstNumber);
            }
            calculatorMemory.operation = CalculatorSystem.CalculatorOperationUIToSystemMapping[operator];
            setDisplayOperator();
            break;
    }
};

function setDisplayNumber(numberStr) {
    displayComponent.textContent = numberStr || 0;
}

function setDisplayOperator() {
    displayOperatorComponent.textContent = CalculatorSystem.CalculatorOperationUIMapping[calculatorMemory.operation] ?? '';
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