import { CalculatorSystem } from "./calculator-system.js";

const calculatorMemory = {
    firstNumber: '',
    operation: undefined,
    secondNumber: ''
}

const displayComponent = document.querySelector("#display-board");
const displayOperatorComponent = document.querySelector('#display-operator');

/**
 * Appends a digit to the currently edited operand and updates the main display.
 * If no operator is selected, the digit is appended to `calculatorMemory.firstNumber`; otherwise it is appended to `calculatorMemory.secondNumber`.
 * @param {number} num - Digit to append to the active operand (0–9).
 */
function insertNumber(num) {
    if (calculatorMemory.operation === undefined) {
        calculatorMemory.firstNumber = (+(calculatorMemory.firstNumber + num)).toString();
        setDisplayNumber(calculatorMemory.firstNumber);
    } else {
        calculatorMemory.secondNumber = (+(calculatorMemory.secondNumber + num)).toString();
        setDisplayNumber(calculatorMemory.secondNumber);
    }
}

/**
 * Handle an operator input: evaluate expressions or update the pending operation and displays.
 *
 * For EQUAL, evaluates the current expression and stores the result as the new first number, clears the pending operation and second number, and updates the number and operator displays.
 * For CLEAR, performs no action.
 * For UI operators (ADD, SUB, MUL, DIV), if an operation is already pending, evaluates the current expression, stores the result as the new first number and clears the second number, then sets the pending operation to the mapped system operation and updates the operator display.
 *
 * @param {string} operator - The operator input (one of CalculatorSystem.CalculatorOperation or CalculatorSystem.CalculatorOperationUI).
 */
function insertOperator(operator) {
    switch (operator) {
        case CalculatorSystem.CalculatorOperation.EQUAL:
            calculatorMemory.firstNumber = operateFirstNumber();
            calculatorMemory.operation = undefined;
            calculatorMemory.secondNumber = ''
            setDisplayNumber(calculatorMemory.firstNumber);
            calculatorMemory.firstNumber = '';
            setDisplayOperator();
            break;
        case CalculatorSystem.CalculatorOperation.CLEAR:
            break;
        case CalculatorSystem.CalculatorOperationUI.ADD:
        case CalculatorSystem.CalculatorOperationUI.SUB:
        case CalculatorSystem.CalculatorOperationUI.MUL:
        case CalculatorSystem.CalculatorOperationUI.DIV:
            if (!!calculatorMemory.operation) {
                calculatorMemory.firstNumber = operateFirstNumber();
                calculatorMemory.secondNumber = ''
                setDisplayNumber(calculatorMemory.firstNumber);
            }
            calculatorMemory.operation = CalculatorSystem.CalculatorOperationUIToSystemMapping[operator];
            setDisplayOperator();
            break;
    }
};

/**
 * Update the main calculator display to show the given number string.
 *
 * If `numberStr` is falsy, the display is set to "0".
 * @param {string} numberStr - The number text to render on the display; may be empty or falsy to reset to "0".
 */
function setDisplayNumber(numberStr) {
    displayComponent.textContent = numberStr || 0;
}

/**
 * Update the operator display element to show the UI label for the currently selected operation.
 *
 * If no operation is selected, clears the operator display.
 */
function setDisplayOperator() {
    displayOperatorComponent.textContent = CalculatorSystem.CalculatorOperationUIMapping[calculatorMemory.operation] ?? '';
}

function operateFirstNumber() {
    return (CalculatorSystem.operate(calculatorMemory.operation, calculatorMemory.firstNumber, calculatorMemory.secondNumber))?.toString() ?? ''
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