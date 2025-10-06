import { CalculatorSystem } from "./calculator-system.js";

const calculatorMemory = {
    firstNumber: '',
    operation: undefined,
    secondNumber: ''
}

const displayComponent = document.querySelector("#display-board");
const displayOperatorComponent = document.querySelector('#display-operator');

/**
 * Append a digit to the active operand and update the main display.
 *
 * If no operator is selected, appends the digit to `calculatorMemory.firstNumber`; otherwise appends to `calculatorMemory.secondNumber`.
 * @param {number} num - Digit (0–9) to append to the active operand.
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

/**
 * Set the calculator's main display to the provided number string.
 * @param {string} numberStr - The number text to render on the display; if falsy, the display shows "0".
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