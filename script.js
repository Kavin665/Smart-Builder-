function estimateCost() {
  const area = parseFloat(document.getElementById("area").value);
  if (isNaN(area) || area <= 0) {
    alert("Please enter a valid area.");
    return;
  }

  const items = [
    { name: "Cement", unit: "bags", rate: 395, qtyPerSqft: 0.4 },
    { name: "Sand", unit: "cft", rate: 55, qtyPerSqft: 0.8 },
    { name: "Steel", unit: "kg", rate: 63.5, qtyPerSqft: 2.5 },
    { name: "Labour", unit: "₹/sqft", rate: 180, qtyPerSqft: 1 }
  ];

  const tableBody = document.querySelector("#boq-table tbody");
  tableBody.innerHTML = "";

  let totalCost = 0;
  items.forEach(item => {
    const qty = item.qtyPerSqft * area;
    const amount = qty * item.rate;
    totalCost += amount;

    const row = `<tr>
      <td>${item.name}</td>
      <td>${item.unit}</td>
      <td>${qty.toFixed(2)}</td>
      <td>${item.rate}</td>
      <td>${amount.toLocaleString()}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  document.getElementById("estimated-cost").textContent =
    `Estimated cost: ₹${totalCost.toLocaleString()}`;
}