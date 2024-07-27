function calculateHomeBuyingPower() {
  // TODO: I might need to include credit score
  const income = parseFloat(document.querySelector("#income").value);
  const downPayment = parseFloat(document.querySelector("#downPayment").value) || 0;
  const loanTerm = parseFloat(document.querySelector("#loanTerm").value);
  const interestRate = parseFloat(document.querySelector("#interestRate").value);
  const otherDebt = parseFloat(document.querySelector("#otherDebt").value) || 0;
  const propertyTax = parseFloat(document.querySelector("#propertyTax").value) || 0;
  const insurance = parseFloat(document.querySelector("#insurance").value) || 0;
  const hoa = parseFloat(document.querySelector("#hoa").value) || 0;

  const annualIncome = income;
  const monthlyIncome = annualIncome / 12;
  const monthlyPropertyTax = (propertyTax / 100) * (downPayment + loanTerm * 12 * interestRate);
  const monthlyInsurance = insurance / 12;
  const monthlyExpenses = otherDebt + monthlyPropertyTax + monthlyInsurance + hoa;

  const maxMonthlyPayment = monthlyIncome * 0.28 - monthlyExpenses;
  const loanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + interestRate / 1200, -loanTerm * 12)) / (interestRate / 1200)) + downPayment;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.querySelector("#homeBuyingPower").textContent = currencyFormatter.format(loanAmount.toFixed(2));
  document.querySelector("#totalLoanAmount").textContent = currencyFormatter.format((loanAmount - downPayment).toFixed(2));
  document.querySelector("#monthlyPayment").textContent = currencyFormatter.format(maxMonthlyPayment.toFixed(2));
}

// 'Enter' key runs the calculation
document.querySelector(".home-buying-power-form").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".calculate-btn").click();
  }
});

// clear calculations
function clearHomeBuyingPower() {
  document.querySelector(".home-buying-power-form").reset();
  document.querySelector("#homeBuyingPower").textContent = "$0";
  document.querySelector("#totalLoanAmount").textContent = "";
  document.querySelector("#monthlyPayment").textContent = "";
}
