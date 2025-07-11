function estimateCost() {
  const area = parseFloat(document.getElementById('area').value);
  const ratePerSqft = 1650;

  if (!isNaN(area) && area > 0) {
    const totalEstimate = area * ratePerSqft;
    document.getElementById('result').textContent = `Estimated cost: ₹${totalEstimate.toLocaleString("en-IN")}`;

    // BOQ Calculation
    const boqData = [
      { item: "Cement", unit: "bags", qtyPerSqft: 0.4, rate: 395 },
      { item: "Sand", unit: "cft", qtyPerSqft: 0.8, rate: 55 },
      { item: "Steel", unit: "kg", qtyPerSqft: 2.5, rate: 63.5 },
      { item: "Labour", unit: "₹/sqft", qtyPerSqft: 1, rate: 180 }
    ];

    const boqBody = document.getElementById("boq-body");
    boqBody.innerHTML = "";

    boqData.forEach(entry => {
      const totalQty = (area * entry.qtyPerSqft).toFixed(2);
      const amount = (totalQty * entry.rate).toFixed(2);
      boqBody.innerHTML += `
        <tr>
          <td>${entry.item}</td>
          <td>${entry.unit}</td>
          <td>${totalQty}</td>
          <td>${entry.rate}</td>
          <td>${parseFloat(amount).toLocaleString("en-IN")}</td>
        </tr>
      `;
    });

    document.getElementById("boq-section").style.display = "block";

  } else {
    document.getElementById('result').textContent = "❌ Please enter a valid area.";
    document.getElementById("boq-section").style.display = "none";
  }
}