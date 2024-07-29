function calculateEmergencyFund() {
  const monthlyExpenses = parseFloat(document.querySelector('#monthlyExpenses').value);
  const coveragePeriod = parseFloat(document.querySelector('#coveragePeriod').value);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!isNaN(monthlyExpenses) && !isNaN(coveragePeriod)) {
    const emergencyFund = monthlyExpenses * coveragePeriod;
    document.querySelector('#emergencyFundAmount').textContent = `${currencyFormatter.format(emergencyFund.toFixed(2))}`;
  } else {
    document.querySelector('#emergencyFundAmount').textContent = '$NaN';
  }
}

// return key on keyboard clicks calculate button
const input = document.querySelector('#coveragePeriod');
input.addEventListener("keypress", function(event) {
  // if the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // cancel the default action
    event.preventDefault();
    // trigger the button element with a click
    document.querySelector("#calculateBtn").click();
  }
});

function clearEmergencyFund() {
  document.querySelector('#monthlyExpenses').value = '';
  document.querySelector('#coveragePeriod').value = '';
  document.querySelector('#emergencyFundAmount').textContent = '$0';
}
