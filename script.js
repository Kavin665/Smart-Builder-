function estimateCost() {
  const area = parseFloat(document.getElementById("area").value);
  if (isNaN(area) || area <= 0) {
    alert("Please enter a valid area.");
    return;
  }

  const rates = {
    cement: 395,
    sand: 55,
    steel: 63.5,
    labour: 180
  };

  const qty = {
    cement: area * 0.4,
    sand: area * 0.8,
    steel: area * 2.5,
    labour: area
  };

  const amounts = {
    cement: qty.cement * rates.cement,
    sand: qty.sand * rates.sand,
    steel: qty.steel * rates.steel,
    labour: qty.labour * rates.labour
  };

  const total = Object.values(amounts).reduce((acc, val) => acc + val, 0);
  document.getElementById("totalCost").textContent = `Estimated cost: ₹${total.toLocaleString()}`;

  const boqHTML = `
    <h3>BOQ Breakdown</h3>
    <table>
      <tr><th>Item</th><th>Unit</th><th>Qty</th><th>Rate (₹)</th><th>Amount (₹)</th></tr>
      <tr><td>Cement</td><td>bags</td><td>${qty.cement.toFixed(2)}</td><td>${rates.cement}</td><td>${amounts.cement.toLocaleString()}</td></tr>
      <tr><td>Sand</td><td>cft</td><td>${qty.sand.toFixed(2)}</td><td>${rates.sand}</td><td>${amounts.sand.toLocaleString()}</td></tr>
      <tr><td>Steel</td><td>kg</td><td>${qty.steel.toFixed(2)}</td><td>${rates.steel}</td><td>${amounts.steel.toLocaleString()}</td></tr>
      <tr><td>Labour</td><td>₹/sqft</td><td>${qty.labour.toFixed(2)}</td><td>${rates.labour}</td><td>${amounts.labour.toLocaleString()}</td></tr>
    </table>
  `;

  document.getElementById("boqSection").innerHTML = boqHTML;
}