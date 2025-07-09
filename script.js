function estimateCost() {
  const area = document.getElementById('area').value;
  const costPerSqft = 1500; // Example base rate
  const total = area * costPerSqft;
  document.getElementById('output').innerText = `Estimated Cost: ₹${total.toLocaleString()}`;
}
