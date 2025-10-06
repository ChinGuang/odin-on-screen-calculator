function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case CalculatorOperation.ADD:
            return add(+num1, +num2);
        case CalculatorOperation.SUB:
            return subtract(+num1, +num2);
        case CalculatorOperation.MUL:
            return multiply(+num1, +num2);
        case CalculatorOperation.DIV:
            return divide(+num1, +num2);
        default:
            throw new Error("Invalid Calculator Operation ", operator);
    }
}

const CalculatorOperation = {
    ADD: '+',
    SUB: '-',
    MUL: '*',
    DIV: '/',
    EQUAL: '=',
    CLEAR: 'CLEAR'
}

const CalculatorOperationUI = {
    ADD: '+',
    SUB: '—',
    MUL: 'x',
    DIV: '÷'
}

const CalculatorOperationUIMapping = {
    [CalculatorOperation.ADD]: CalculatorOperationUI.ADD,
    [CalculatorOperation.SUB]: CalculatorOperationUI.SUB,
    [CalculatorOperation.MUL]: CalculatorOperationUI.MUL,
    [CalculatorOperation.DIV]: CalculatorOperationUI.DIV,
}


export const CalculatorSystem = {
    operate,
    CalculatorOperation,
    CalculatorOperationUI,
    CalculatorOperationUIMapping
}