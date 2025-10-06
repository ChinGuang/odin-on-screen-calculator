const calculatorMemory = {
    firstNumber: '',
    operation: undefined,
    secondNumber: ''
}

const displayComponent = document.querySelector("#display-board");

function insertNumber(num) {
    if (calculatorMemory.operation === undefined) {
        calculatorMemory.firstNumber += num;
    } else {
        calculatorMemory.secondNumber += num;
    }
    setDisplayNumber();
}

function setDisplayNumber() {
    if (calculatorMemory.operation === undefined) {
        displayComponent.textContent = calculatorMemory.firstNumber;
    } else {
        displayComponent.textContent = calculatorMemory.secondNumber;
    }
}

const digitButtons = document.querySelectorAll(".digit-button");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => {
        const digit = e.target.textContent;
        insertNumber(+digit);
    })
});