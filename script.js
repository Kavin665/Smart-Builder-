document.addEventListener("DOMContentLoaded", () => {
  const estimateBtn = document.querySelector("button");
  const inputField = document.querySelector("input");
  
  estimateBtn.addEventListener("click", () => {
    const area = parseFloat(inputField.value);
    const ratePerSqft = 1650; // Tamil Nadu SOR-based base rate
    const output = document.querySelector("#result");

    if (isNaN(area) || area <= 0) {
      output.innerHTML = "❌ Please enter a valid area in sqft.";
      return;
    }

    const totalCost = area * ratePerSqft;
    output.innerHTML = `🏗️ Estimated Construction Cost: ₹${totalCost.toLocaleString("en-IN")}`;
  });
});
