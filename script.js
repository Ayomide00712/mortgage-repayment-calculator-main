document
  .getElementById("morgage-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    calculateRepayment();
  });
document.getElementById("clear-all").addEventListener("click", function () {
  resetForm();
});

function calculateRepayment() {
  const amount = parseFloat(document.getElementById("mortgage-amount").value);
  const term = parseInt(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value);
  const type = document.querySelector(
    'input[name="mortgage-type"]:checked'
  ).value;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = term * 12;

  let monthlyRepayment, totalRepayment;

  if (type === "repayment") {
    monthlyRepayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    totalRepayment = monthlyRepayment * totalPayments;
  } else {
    monthlyRepayment = amount * monthlyRate;
    totalRepayment = monthlyRepayment * totalPayments + amount;
    monthlyRepayment = amount * monthlyRate;
    totalRepayment = monthlyRepayment * totalPayments + amount;
  }

  // Update results
  document.getElementById(
    "monthly-repayment"
  ).textContent = `£${monthlyRepayment.toFixed(2)}`;
  document.getElementById(
    "total-repayment"
  ).textContent = `£${totalRepayment.toFixed(2)}`;

  // Toggle results visibility
  document.getElementById("empty-results").style.display = "none";
  document.getElementById("completed-results").style.display = "block";
}

function resetForm() {
  // Reset form values
  document.getElementById("morgage-form").reset();
  document.getElementById("mortgage-amount").value = "";
  document.getElementById("mortgage-term").value = "";
  document.getElementById("interest-rate").value = "";
  document.querySelector('input[value="repayment"]').checked = true;

  // Reset results
  document.getElementById("monthly-repayment").textContent = "£0.00";
  document.getElementById("total-repayment").textContent = "£0.00";

  // Toggle results visibility
  document.getElementById("empty-results").style.display = "block";
  document.getElementById("completed-results").style.display = "none";
}
