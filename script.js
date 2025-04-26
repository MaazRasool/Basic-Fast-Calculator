class Calculator {
    constructor(previousVal, currentVal) {
        this.currentVal = currentVal
        this.previousVal = previousVal
        this.clear()
    }
    clear() {
        this.currentIn = ''
        this.previousIn = ''
        this.operationIn = undefined
    }
    delete() {
        this.currentIn = this.currentIn.toString().slice(0, -1)
    }
    appendNumber(unit) {
        if (unit === '.' && this.currentIn.includes('.')) return
        this.currentIn = this.currentIn.toString() + unit.toString()
    }
    chooseOperation(operationIn) {
        if (this.currentIn === '') return
        if (this.previousIn !== '') {
            this.compute()
        }
        this.operationIn = operationIn
        this.previousIn = this.currentIn
        this.currentIn = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousIn)
        const curr = parseFloat(this.currentIn)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operationIn) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }
        this.currentIn = computation
        this.operationIn = undefined
        this.previousIn = ''
    }
    getDisplayNumber(unit) {
        const stringNum = unit.toString()
        const integer = parseFloat(stringNum.split(`.`)[0])
        const decimal = stringNum.split(`.`)[1]
        let integerDisplay
        if (isNaN(integer)) {
            integerDisplay = ''
        } else {
            integerDisplay = integer.toLocaleString('en-IN', {
                maximumFractionDigits: 0
            })
        }
        if (decimal != null) {
            return `${integerDisplay}.${decimal}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentVal.innerText = this.getDisplayNumber(this.currentIn)
        if (this.operationIn != null) {
            this.previousVal.innerText = `${this.getDisplayNumber(this.previousIn)} ${this.operationIn}`
        } else {
            this.previousVal.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allclearButton = document.querySelector('[all-clear]')
const previousVal = document.querySelector('[previous]')
const currentVal = document.querySelector('[current]')

const calculator = new Calculator(previousVal, currentVal)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})