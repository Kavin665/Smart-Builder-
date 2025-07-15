function estimateCost() {
  const area = parseFloat(document.getElementById("area").value);
  if (isNaN(area) || area <= 0) {
    alert("Please enter a valid area.");
    return;
  }

  const boqData = [
    { item: "Cement", unit: "bags", qtyPerSqft: 0.4, rate: 395 },
    { item: "Sand", unit: "cft", qtyPerSqft: 0.8, rate: 55 },
    { item: "Steel", unit: "kg", qtyPerSqft: 2.5, rate: 63.5 },
    { item: "Labour", unit: "₹/sqft", qtyPerSqft: 1, rate: 180 }
  ];

  let totalCost = 0;
  const tbody = document.querySelector("#boqTable tbody");
  tbody.innerHTML = "";

  boqData.forEach(entry => {
    const qty = entry.qtyPerSqft * area;
    const amount = qty * entry.rate;
    totalCost += amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.item}</td>
      <td>${entry.unit}</td>
      <td>${qty.toFixed(2)}</td>
      <td>${entry.rate}</td>
      <td>${amount.toLocaleString('en-IN')}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalCost").textContent = `Estimated cost: ₹${totalCost.toLocaleString('en-IN')}`;
}