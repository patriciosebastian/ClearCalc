function calculateHomeBuyingPower() {
  // TODO: update to querySelector syntax
  const income = parseFloat(document.getElementById("income").value);
  const downPayment =
    parseFloat(document.getElementById("downPayment").value) || 0;
  const loanTerm = parseFloat(document.getElementById("loanTerm").value);
  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  const otherDebt = parseFloat(document.getElementById("otherDebt").value) || 0;
  const propertyTax =
    parseFloat(document.getElementById("propertyTax").value) || 0;
  const insurance = parseFloat(document.getElementById("insurance").value) || 0;
  const hoa = parseFloat(document.getElementById("hoa").value) || 0;

  const annualIncome = income;
  const monthlyIncome = annualIncome / 12;
  const monthlyPropertyTax =
    (propertyTax / 100) * (downPayment + loanTerm * 12 * interestRate);
  const monthlyInsurance = insurance / 12;
  const monthlyExpenses =
    otherDebt + monthlyPropertyTax + monthlyInsurance + hoa;

  const maxMonthlyPayment = monthlyIncome * 0.28 - monthlyExpenses;
  const loanAmount =
    maxMonthlyPayment *
      ((1 - Math.pow(1 + interestRate / 1200, -loanTerm * 12)) /
        (interestRate / 1200)) +
    downPayment;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.getElementById("homeBuyingPower").textContent =
    currencyFormatter.format(loanAmount.toFixed(2));
  document.getElementById("totalLoanAmount").textContent =
    currencyFormatter.format((loanAmount - downPayment).toFixed(2));
  document.getElementById("monthlyPayment").textContent =
    currencyFormatter.format(maxMonthlyPayment.toFixed(2));
}

// 'Enter' key runs the calculation
document
  .querySelector(".home-buying-power-form")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".calculate-btn").click();
    }
  });

function clearHomeBuyingPower() {
  document.querySelector(".home-buying-power-form").reset();
  document.getElementById("homeBuyingPower").textContent = "$0";
  document.getElementById("totalLoanAmount").textContent = "";
  document.getElementById("monthlyPayment").textContent = "";
}
