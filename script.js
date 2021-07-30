if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var buttons = document.getElementsByClassName('percent-btn')
    var resetBtn = document.getElementsByClassName('reset-btn')[0]
    var billInput = document.getElementById('bill-input')
    var customTipInput = document.getElementById('custom-tip-input')
    var peopleInput = document.getElementById('people-input')

    for(let i = 0; i < buttons.length; i++) {
        var button = buttons[i]
        button.addEventListener('click', percentBtnClicked)
    }

    resetBtn.addEventListener('click', resetBtnClicked)

    billInput.addEventListener('change', billInputChange)

    customTipInput.addEventListener('change', customTipInputChange)
    customTipInput.addEventListener('focus', customTipInputFocus)

    peopleInput.addEventListener('change', peopleInputChange)
}

function percentBtnClicked(event) {
    var button = event.target
    resetActive()
    button.classList.toggle('active-btn')
    button.classList.toggle('active-tip')
    calculate()
}

function resetBtnClicked(event) {
    var button = event.target
    document.getElementById('bill-input').value = ''
    document.getElementById('custom-tip-input').value = ''
    document.getElementById('people-input').value = 1
    resetActive()
    calculate()
    button.disabled = 1
}

function billInputChange(event) {
    var input = event.target
    var resetBtn = document.getElementsByClassName('reset-btn')[0]
    if( isNaN(input.value) || input.value < 0 ) {
        input.value = 0
        resetBtn.disabled = 1
        return
    }

    calculate()
    resetBtn.disabled = 0
}

function customTipInputChange(event) {
    var input = event.target
    var resetBtn = document.getElementsByClassName('reset-btn')[0]
    if( isNaN(input.value) || input.value <= 0) {
        input.value = ''
        return
    }
    calculate()
    resetBtn.disabled = 0
}

function customTipInputFocus(event) {
    var input = event.target
    resetActive()
    input.classList.toggle('active-tip')
    if( input.value >= 0 ) { calculate() }

}

function peopleInputChange(event) {
    var input = event.target
    var resetBtn = document.getElementsByClassName('reset-btn')[0]
    if( isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    calculate()
    resetBtn.disabled = 0
}

function resetActive() {
    var buttons = document.getElementsByClassName('active-btn')
    var activeTip = document.getElementsByClassName('active-tip')[0]
    if( buttons.length > 0) {
        buttons[0].classList.toggle('active-btn')
    }
    
    if( activeTip ) {
        activeTip.classList.toggle('active-tip')
    }
}

function getTipPercentage() {
    var tip = document.getElementsByClassName('active-tip')[0]
    if( !tip ) {return 0}
    var tipPercent = 0
    if( tip.nodeName == 'INPUT') {
        return tipPercent = tip.value / 100
    } else {
        return tipPercent = parseFloat(tip.innerText.replace('%', ''))/100
    }
}

function calculate() {
    var bill = parseFloat(document.getElementById('bill-input').value)
    var tip = getTipPercentage();
    var people = parseFloat(document.getElementById('people-input').value)
    const tipValue = document.getElementById('tip-value')
    const totalValue = document.getElementById('total-value')

    if( bill > 0 ) {
        var tipAmount = ((bill * tip) / people)
        var total = ((bill + tipAmount*people) / people)

        tipValue.innerText = '$' + tipAmount.toFixed(2)
        totalValue.innerText = '$' + total.toFixed(2)
    } else {
        tipValue.innerText = '$0.00'
        totalValue.innerText = '$0.00'
    }
    
    
}