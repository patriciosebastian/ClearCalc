function calculateEmergencyFund() {
  const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
  const coveragePeriod = parseFloat(document.getElementById('coveragePeriod').value);

  if (!isNaN(monthlyExpenses) && !isNaN(coveragePeriod)) {
    const emergencyFund = monthlyExpenses * coveragePeriod;
    document.getElementById('emergencyFundAmount').textContent = `$${emergencyFund.toFixed(2)}`;
  } else {
    document.getElementById('emergencyFundAmount').textContent = '$0';
  }
}

function clearEmergencyFund() {
  document.getElementById('monthlyExpenses').value = '';
  document.getElementById('coveragePeriod').value = '';
  document.getElementById('emergencyFundAmount').textContent = '$0';
}
