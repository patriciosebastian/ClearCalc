// inject loan calculation in a table
function calculateAmortization() {
    const loanAmount = parseFloat(document.querySelector('#loanAmount').value);
    const loanTerm = parseInt(document.querySelector('#loanTerm').value);
    const loanRate = parseFloat(document.querySelector('#loanRate').value);

    // user input for loan amount needs to be more than 0
    if (loanAmount <= 0 || isNaN(loanAmount)) {
        alert("Please enter a valid loan amount (positive number)");
        return;
    }

    // user input for term length needs to be more than 0
    if (loanTerm <= 0 || isNaN(loanTerm) || !Number.isInteger(loanTerm)) {
        alert("Please enter a valid term (positive integer)");
        return;
    }

    // user input for rate needs to be more than 0
    if (loanRate <= 0 || isNaN(loanRate)) {
        alert("Please enter a valid rate (positive number)");
        return;
    }

    let numPayments = loanTerm;
    let ratePerPeriod = loanRate * 0.01 / 12; // convert to decimal and divide by 12
    let loanPayment = loanAmount * ratePerPeriod * Math.pow(1 + ratePerPeriod, numPayments) / (Math.pow(1 + ratePerPeriod, numPayments) - 1);

    let balance = loanAmount;
    let totalInterest = 0;
    let scheduleTable = '<div class="col"><table class="table table-striped table-hover"><thead class="text-white" id="tableHeader"><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Total Interest</th><th>Balance</th></tr></thead>';

    // loop over each month for the length of the term
    // calculate each value for current month
    // add all the values for each month to a new row in a table
    for (let month = 1; month <= numPayments; month++) {
        let interest = balance * ratePerPeriod;
        let principal = loanPayment - interest;
        balance -= principal;
        totalInterest += interest;

        scheduleTable += '<tr><td>' + month + '</td><td>' + loanPayment.toFixed(2) + '</td><td>' + principal.toFixed(2) + '</td><td>' + interest.toFixed(2) + '</td><td>' + totalInterest.toFixed(2) + '</td><td>' + Math.abs(balance).toFixed(2) + '</td></tr>';
    }

    scheduleTable += '</table></div>';

    //inject generated table to the page
    document.querySelector('#amortizationSchedule').innerHTML = scheduleTable;

    const totalPrincipal = loanAmount;
    const totalCost = totalPrincipal + totalInterest;
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    document.querySelector("#totalPrincipal").textContent = currencyFormatter.format(totalPrincipal);
    document.querySelector("#totalInterest").textContent = currencyFormatter.format(totalInterest);
    document.querySelector("#totalCost").textContent = currencyFormatter.format(totalCost);
    document.querySelector('#monthlyPayment').textContent = currencyFormatter.format(loanPayment);
}

// clear table and total calculations
function clearCalculateAmortization() {
    document.querySelector('#amortizationSchedule').innerHTML = '';
    document.querySelector("#totalPrincipal").textContent = '';
    document.querySelector("#totalInterest").textContent = '';
    document.querySelector("#totalCost").textContent = '';
    document.querySelector("#monthlyPayment").textContent = '';
}
