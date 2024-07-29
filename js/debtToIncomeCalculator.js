function calculateDebtToIncomeRatio() {
  const monthlyIncome = parseFloat(document.querySelector('#monthlyIncome').value);
  const monthlyDebtPayments = parseFloat(document.querySelector('#monthlyDebtPayments').value);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!isNaN(monthlyIncome) && !isNaN(monthlyDebtPayments) && monthlyIncome > 0) {
    const debtToIncomeRatio = (monthlyDebtPayments / monthlyIncome) * 100;
    document.querySelector('#debtToIncomeRatio').textContent = `${currencyFormatter.format(debtToIncomeRatio.toFixed(2))}%`;
  } else {
    document.querySelector('#debtToIncomeRatio').textContent = 'NaN';
  }
}

// return key on keyboard clicks calculate button
const input = document.querySelector('#monthlyDebtPayments');
input.addEventListener("keypress", function(event) {
  // if the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // cancel the default action
    event.preventDefault();
    // trigger the button element with a click
    document.querySelector("#calculateBtn").click();
  }
});

function clearDebtToIncomeRatio() {
  document.querySelector('#monthlyIncome').value = '';
  document.querySelector('#monthlyDebtPayments').value = '';
  document.querySelector('#debtToIncomeRatio').textContent = '0%';
}
